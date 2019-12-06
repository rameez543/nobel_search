import React from 'react';
import '../styles/ResultCard.css'

export const ResultCard = ({ data }) => {

    return (
        <div className="card">
            <div>
                <h1>{`${data.firstname} ${data.surname}`}</h1>
            </div>
            <div className="card-content">
                <table border={1} cellPadding={5} cellSpacing={5} width={600}>
                    <tbody>
                        <tr>
                            <td className='table-data'>Field</td>
                            <td>{data.field}</td>
                        </tr>

                        <tr>
                            <td className='table-data'>Year</td>
                            <td>{data.year}</td>
                        </tr>
                        <tr>
                            <td className='table-data'>country</td>
                            <td>{data.country}</td>
                        </tr>
                        <tr>
                            <td className='table-data'>shared with</td>
                            <td>{data.shares.join(",")}</td>
                        </tr>
                        <tr>
                            <td className='table-data'>motivation</td>
                            <td>{data.motivation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}