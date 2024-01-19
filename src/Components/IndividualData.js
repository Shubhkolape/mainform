import React from 'react'

export const IndividualData = ({individualData,index}) => {
    return (
        <tr>
            <th>{index}</th>
            <th>{individualData.Email}</th>
            <th>{individualData.SessionId}</th>
            <th>{individualData.Issue}</th>
        </tr>
    )
}
