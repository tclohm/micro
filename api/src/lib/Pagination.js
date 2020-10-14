import { UserInputError } from "apollo-server";

class Pagination {
	constructor(Model) {
		this.Model = Model;
	}

	// Get document and cast them into the correct edge/node shape
	async getEdges(queryArgs) {
		const {
			after,
			before,
			first,
			last,
			filter = {},
			sort = {}
		} = queryArgs;
		let edges;

		// handle user input errors...
		if (!first && !last) {
			throw new UserInputError(
				"Provide a `first` or `last` value to paginate this connection"
			);
		} else if (first && last) {
			throw new UserInputError(
				"Passing `first` and `last` arguments is not supported with this connection."
			);
		} else if (first < 0 || last < 0) {
			throw new UserInputError(
				"Minimum record request for `first` and `last` arguments is 0."
			);
		} else if (first > 100 || last > 100) {
			throw new UserInputError(
				"Maximum record request for `first` and `last` arguments is 100."
			);
		}

		if (first) {
			// forward pagination happens here
			// edges = ???
			const operator = this._getOperator(sort);
			const queryDoc = after
				? await this._getFilterWithCursor(after, filter, operator, sort)
				: filter;

			const docs = await this.Model.find(queryDoc)
				.sort(sort)
				.limit(first)
				.exec();

			edges = docs.length
				? docs.map(doc => ({ cursor: doc._id, node: doc }))
				: [];
		} else {
			// backward pagination happens here (later)
			// edges = ???
		}

		return edges;
	}

	// Get pagination information
	async getPageInfo(edges, queryArgs) {
		return {
			hasNextPage: false,
			hasPreviousPage: false,
			startCursor: null,
			endCursor: null
		};
	}

	// Add the cursor ID with the correct comparison operator to the query filter
	async _getFilterWithCursor(fromCursorId, filter, operator, sort) {
		let filterWithCursor = { $and: [filter] };
		const fieldArr = Object.keys(sort);
		const field = fieldArr.length ? fieldArr[0] : "_id";
		const fromDoc = await this.Model.findOne({ _id: fromCursorId })
			.select(field)
			.exec();

		if (!fromDoc) {
			throw new UserInputError(`No record found for ID '${fromCursorId}'`);
		}

		filterWithCursor.$and.push({
			[field]: { [operator]: fromDoc[field] }
		});

		return filterWithCursor;
	}

	// Create the aggregation pipeline to paginate a full-text search
	async _getSearchPipelin(fromCursorId, filter, first, operator, sort) {}

	// Reverse the sort direction when queries need to look in the opposite
	// direction of the set sort order (e.g. next/previous page checks)
	_reverseSortDirection(sort) {}

	// Get the correct comparison operator based on the sort order
	_getOperator(sort, options = {}) {
		const orderArr = Object.values(sort);
		return orderArr.length && orderArr[0] === -1 ? "$lt" : "$gt";
	}

	// Determine if a query is a full-text search based on the sort
	// expression
	_isSearchQuery(sort) {}

	// Check if a next page of results is available
	async _getHasNextPage(endCursor, filter, sort) {}

	// Check if a previous page of results is available
	async _getHasPreviousPage(startCursor, fitler,sort) {}

	// Get the ID of the first document in the paging window
	_getStartCursor(edges) {}

	// Get the ID of the last document in the paging window
	_getEndCursor(edges) {}

}

export default Pagination;