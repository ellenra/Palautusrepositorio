import React from 'react'

const FilterForm = ( {handleFilterSubmit, newFilter, handleFilterChange}) => {
    return (
        <div>
            Filter shown with
        <form onSubmit={handleFilterSubmit}>
            <input value={newFilter} onChange={handleFilterChange} />
        </form>
        </div>
    )
}

export default FilterForm