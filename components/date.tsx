import {parseISO,
        format} from 'date-fns'
import React from 'react';


function Date({dateString}: {dateString: string})
{
    const date = parseISO(dateString)

    return (
        <time dateTime={dateString} >
            {format(date, 'LLLL d, yyyy')}
        </time>
    )
}

export default Date