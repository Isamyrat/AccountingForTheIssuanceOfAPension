import React, { Component } from 'react';
import AccountingForPaymentsService from '../../services/accountingForPayments/AccountingForPaymentsService';

class CreateUpdateAccountingForPaymentsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sumaryId: this.props.match.params.summaryId,
            date: '',
            salary: 0,
            idUser: this.props.match.params.idUser,
        };
        this.saveSummary = this.saveSummary.bind(this);
    }
    componentDidMount = () => {
        const id = this.props.match.params.summaryId;


        if (id) {
            this.findByIdSummary(id);
        }
    };
    findByIdSummary = (id) => {
        console.log('id 1  => ' + id);

        setTimeout(() => {
            AccountingForPaymentsService.getById(id).then((res) => {
                let summary = res.data;

                if (summary != null) {
                    this.setState({

                        date: summary.date,
                        salary: summary.salary,

                    });
                }
            });
        }, 1000);
    };

    summaryChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    saveSummary = (e) => {
        e.preventDefault();
        const userId = this.state.idUser;
        let summary = {
            date: this.state.date,
            salary: this.state.salary,
        };

        console.log('summary => ' + JSON.stringify(summary));

        AccountingForPaymentsService.createAccountingForPayments(userId, summary).then(() => {
            this.props.history.push(
                `/user-profile-page/${this.state.idUser}`
            );
        });
    };
    updateSummary = (e) => {
        e.preventDefault();
        const sumaryId = this.state.sumaryId;
        let summary = {
            id: sumaryId,
            date: this.state.date,
            salary: this.state.salary,
        };

        console.log('summary => ' + JSON.stringify(summary));
        AccountingForPaymentsService.updateAccountingForPayments(summary).then(() => {
            this.props.history.push(
                `/user-profile-page/${this.state.idUser}`
            );
        });
    };
    cancel() {
        this.props.history.push(
            `/user-profile-page/${this.state.idUser}`
        );
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                                {this.state.sumaryId
                                    ? 'Изменение учет выплаты пенсии'
                                    : 'Добавление учет выплаты пенсии'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.center
                                            ? this.updateSummary
                                            : this.saveSummary
                                    }
                                >


                                    <div className='form-group'>
                                        <label>
                                            Дата выдачи:
                                        </label>
                                        <input
                                            placeholder=' Дата выдачи:'
                                            name='date'
                                            type='date'
                                            className='form-control'
                                            value={this.state.date}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>
                                            Сумма пенсии:
                                        </label>
                                        <input
                                            placeholder='Сумма пенсии:'
                                            name='salary'
                                            type='number'
                                            className='form-control'
                                            value={this.state.salary}
                                            onChange={this.summaryChange}
                                        />
                                    </div>


                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.sumaryId
                                                ? this.updateSummary
                                                : this.saveSummary
                                        }
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={this.cancel.bind(this)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Назад
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUpdateAccountingForPaymentsComponent;
