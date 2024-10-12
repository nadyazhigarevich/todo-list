import React, { Component } from 'react'

export default class Filters extends Component {
    render() {
        const { severities, onSeverityFilter, onFilter } = this.props
        return (
            <>
                <div className="flex items-center gap-3 my-2 flex-col justify-center md:flex-row">
                    <p className="font-semibold">Filter by severity: </p>
                    {severities.map((level) => (
                        <label key={level} className="flex items-center">
                            <input
                                type="checkbox"
                                value={level}
                                onChange={onSeverityFilter}
                            />
                            <span className="ml-2">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                        </label>
                    ))}
                </div>
                <label className="flex justify-start items-center gap-2 my-2">
                    <input type="checkbox" onChange={onFilter} />
                    <p>Hide completed</p>
                </label>
            </>
        )
    }
}
