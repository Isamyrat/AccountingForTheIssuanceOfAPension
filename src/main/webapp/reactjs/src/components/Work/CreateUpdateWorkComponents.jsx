import React, { Component } from 'react';
import WorkService from '../../services/work/WorkService';

class CreateUserWorkComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sumaryId: this.props.match.params.summaryId,
            nameOfWork: '',
            position: '',
            takeSalary: '',
            
            didWorkFrom: '',
            didWorkTo: '',
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
            WorkService.getById(id).then((res) => {
                let summary = res.data;

                if (summary != null) {
                    this.setState({
                        nameOfWork:summary.nameOfWork,
                        position: summary.position,
                        didWorkFrom: summary.didWorkFrom,
                        didWorkTo: summary.didWorkTo,
                        takeSalary: summary.takeSalary,
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
            nameOfWork: this.state.nameOfWork,
            position: this.state.position,
            didWorkFrom: this.state.didWorkFrom,
            didWorkTo: this.state.didWorkTo,
            takeSalary: this.state.takeSalary,
        };

        console.log('summary => ' + JSON.stringify(summary));

        WorkService.createWork(userId, summary).then((res) => {
            this.props.history.push(
                `/profile/${this.state.idUser}`
            );
        });
    };
    updateSummary = (e) => {
        e.preventDefault();
        const sumaryId = this.state.sumaryId;
        let summary = {
            id: sumaryId,
            nameOfWork: this.state.nameOfWork,
            position: this.state.position,
            didWorkFrom: this.state.didWorkFrom,
            didWorkTo: this.state.didWorkTo,
            takeSalary: this.state.takeSalary
        };

        console.log('summary => ' + JSON.stringify(summary));
        WorkService.updateWork(summary).then((res) => {
            this.props.history.push(
                `/profile/${this.state.idUser}`
            );
        });
    };
    cancel() {
        this.props.history.push(
            `/profile/${this.state.idUser}`
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
                                    ? '?????????????????? ?????????? ????????????'
                                    : '???????????????????? ?????????? ????????????'}
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
                                          ???????????????????????? ??????????????????????:
                                        </label>
                                        <input
                                            placeholder=' ???????????????????????? ??????????????????????:'
                                            name='nameOfWork'
                                            type='text'
                                            className='form-control'
                                            value={this.state.nameOfWork}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>
                                           ??????????????????:
                                        </label>
                                        <input
                                            placeholder='  ??????????????????:'
                                            name='position'
                                            type='text'
                                            className='form-control'
                                            value={this.state.position}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                 

                                    <div className='form-group'>
                                        <label>?? ???????????? ??????????????:</label>
                                        <input
                                            placeholder='????????:'
                                            name='didWorkFrom'
                                            type='date'
                                            className='form-control'
                                            value={this.state.didWorkFrom}
                                            onChange={this.summaryChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>???? ?????????? ??????????:</label>
                                        <input
                                            placeholder='????????:'
                                            name='didWorkTo'
                                            type='date'
                                            className='form-control'
                                            value={this.state.didWorkTo}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>???????????????????? ???????????????????? ??????????:</label>
                                        <input
                                            placeholder='???????????????????? ???????????????????? ??????????:'
                                            name='takeSalary'
                                            type='number'
                                            className='form-control'
                                            value={this.state.takeSalary}
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
                                        ??????????????????
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={this.cancel.bind(this)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        ??????????
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

export default CreateUserWorkComponents;
