import React from 'react';
import './style.css';

class CollectionResultTable extends React.Component {
    render() {
        //Get the scores
        const { scores } = this.props;

        return (
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th className="result-header">Attempts</th>
                        <th className="result-header">Date</th>
                        <th className="result-header">Score</th>
                    </tr>
                </thead>

                <tbody>
                {
                    scores.map((score, index) => {
                        return (
                            <tr key={index}>
                                <td>#{ index }</td>
                                <td>{ score.createdAt }</td>
                                <td>{ score.rightQuestions } / { score.totalQuestions }</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        )
    }
}

export default CollectionResultTable;