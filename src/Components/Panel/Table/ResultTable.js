import React from 'react';
import './style.css';

import  {
    Link
} from 'react-router-dom';

class ResultTable extends React.Component {
    render() {
        //Get the result
        const { scores } = this.props;

        //Render table
        return (
            <div className="result-table">
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th className="result-table-head">Collection</th>
                            <th className="result-table-head">Date</th>
                            <th className="result-table-head">Score</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        scores.map(score => {
                            return (
                                <tr>
                                    <td>
                                        <Link 
                                            to={`/collections/${score.collectionId}`}
                                            className="green-link"> 
                                            { score.collection.title } 
                                        </Link>
                                    </td>
                                    <td>{ score.createdAt }</td>
                                    <td>{ score.rightQuestions } / { score.totalQuestions }</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResultTable;