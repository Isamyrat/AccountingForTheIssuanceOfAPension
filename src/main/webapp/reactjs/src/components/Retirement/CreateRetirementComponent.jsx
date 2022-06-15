import React, { Component } from 'react';
import RetirementService from '../../services/retirement/RetirementService';
import axios from 'axios';
class CreateRetirementComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            retirementId: this.props.match.params.retirementId,
            date: '',
            reason: '',
            reasons: [],
            theEstablishedPension: 0,
            idUser: this.props.match.params.idUser,
        };
        this.saveReason = this.saveReason.bind(this);
    }
    componentDidMount = () => {
        const id = this.state.retirementId;

        if (id) {
            this.findUserInformationById(id);
        }
        this.findAllReasonsToRetire();

    };
    findUserInformationById = (id) => {
        setTimeout(() => {
            RetirementService.getRetirementByRetirementId(
                id
            ).then((res) => {
                let retirement = res.data;

                if (retirement != null) {
                    this.setState({
                        date: retirement.date,
                        reason: retirement.reason,
                        theEstablishedPension: retirement.theEstablishedPension,
                    });
                }
            });
        }, 1000);
    };
    findAllReasonsToRetire = () => {
        setTimeout(() => {
            axios
                .get('http://localhost:8081/rest/user/retirement/reasonToRetire')
                .then((response) => {
                    let genres = response.data;
                    if (genres != null) {
                        this.setState({
                            reasons: [
                                { value: '', display: 'Выберите причину выхода на пенсию' },
                            ].concat(
                                genres.map((reason) => {
                                    return { value: reason, display: reason };
                                })
                            ),
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 100);
    };
    retirementChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    saveReason = (e) => {
        e.preventDefault();
        const userId = this.state.idUser;
        let retirement = {
            date: this.state.date,
            reason: this.state.reason,
            theEstablishedPension: this.state.theEstablishedPension,
        };

        RetirementService.createRetirement(
            userId,
            retirement
        ).then(() => {
            this.props.history.push(
                `/user-profile-page/${this.state.idUser}`
            );
        });
    };
    updateReason = (e) => {
        e.preventDefault();
        const retirementId = this.state.retirementId;
        let retirement = {
            id: retirementId,
            date: this.state.date,
            reason: this.state.reason,
            theEstablishedPension: this.state.theEstablishedPension,
        };

        console.log('retirement => ' + JSON.stringify(retirement));
        RetirementService.updateRetirement(retirement).then(
            () => {
                this.props.history.push(
                    `/user-profile-page/${this.state.idUser}`
                );
            }
        );
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
                                {this.state.retirementId
                                    ? 'Изменение данных о выходе в пенсию'
                                    : 'Добавление данных о выходе в пенсию'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.retirementId
                                            ? this.updateReason
                                            : this.saveReason
                                    }
                                >

                                    <div className='form-group'>
                                        <label>Дата:</label>
                                        <input
                                            placeholder='Дата:'
                                            name='date'
                                            type='date'
                                            className='form-control'
                                            value={this.state.date}
                                            onChange={
                                                this.retirementChange
                                            }
                                        />
                                    </div>


                                    <div className='form-group'>
                                        <label>Причина выхода на пенсию:</label>
                                        <select
                                            placeholder='Ваш пол:'
                                            name='reason'
                                            type='select'
                                            className='form-control'
                                            value={this.state.reason}
                                            onChange={
                                                this.retirementChange
                                            }
                                        >
                                            {this.state.reasons.map((reason) => (
                                                <option
                                                    key={reason.value}
                                                    value={reason.value}
                                                >
                                                    {reason.display}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div className='form-group'>
                                        <label>
                                           Установленная сумма пенсии:
                                        </label>
                                        <input
                                            placeholder='Сумма пенсии:'
                                            name='theEstablishedPension'
                                            type='number'
                                            className='form-control'
                                            value={this.state.theEstablishedPension}
                                            onChange={this.retirementChange}
                                        />
                                    </div>
                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.retirementId
                                                ? this.updateReason
                                                : this.saveReason
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

export default CreateRetirementComponent;
