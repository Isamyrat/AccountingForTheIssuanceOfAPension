import React, { Component } from 'react';
import UserService from '../../services/user/UserService';
import UserInformationService from '../../services/user/UserInformationService';
import AddressService from '../../services/address/AddressService';
import WorkService from '../../services/work/WorkService';
import RetirementService from '../../services/retirement/RetirementService';

import {
    Card,
    Table,
    InputGroup,
    FormControl,
    Button,
    Tabs,
    Tab,
    Row,
    Col,
    Container,
} from 'react-bootstrap';
import axios from 'axios';
import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.idUser,

            user: {},
            userInformation: {},
            retirement: {},
            address: {},
            summary: [],
            resommendationEmployer: [],
            currentPage: 1,
            usersPerPage: 5,
            justCurrentPage: 1,
            justPerPage: 5,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            UserService.getUserById(this.state.id).then((res) => {
                this.setState({ user: res.data });
            });
            UserInformationService.getUserInformationByUserId(
                this.state.id
            ).then((res) => {
                this.setState({ userInformation: res.data });
            });
            RetirementService.getRetirementByUserId(
                this.state.id
            ).then((res) => {
                this.setState({ retirement: res.data });
            });
            AddressService.getAddressUserId(
                this.state.id
            ).then((res) => {
                this.setState({ address: res.data });
            });
            this.findAllSummaries(this.state.currentPage);
            this.findAllRecommendations(this.state.currentPage);

        }, 1000);
    }
    addSummary = () => {
        setTimeout(() => {
            this.props.history.push(
                `/create-work/${this.state.id}`
            );
        }, 1000);
    };
    editSummary = (summaryId) => {
        setTimeout(() => {
            this.props.history.push(
                `/update-work/${summaryId}/${this.state.id}`
            );
        }, 1000);
    };
    findAllSummaries(currentPage) {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/work/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.usersPerPage +
                '&id=' +
                this.state.id

            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    summary: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    findAllRecommendations(justCurrentPage) {
        justCurrentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/accountingForPayments/?pageNumber=' +
                justCurrentPage +
                '&pageSize=' +
                this.state.justPerPage +
                '&id=' +
                this.state.id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    resommendationEmployer: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    justCurrentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    editUser = (idUser) => {
        setTimeout(() => {
            this.props.history.push(`/update-user/${idUser}`);
        }, 1000);
    };
    addImageAccount = (idUserInformation) => {
        let idUser = this.state.id;

        setTimeout(() => {
            this.props.history.push(
                `/create-account-image/${idUserInformation}/${idUser}`
            );
        }, 1000);
    };

    createUserInformation() {
        this.props.history.push(`/create-user-information/${this.state.id}`);
    }
    editUserInformation = (userInformationId) => {
        setTimeout(() => {
            this.props.history.push(
                `/update-user-information/${userInformationId}/${this.state.id}`
            );
        }, 1000);
    };
  
    createAddress() {
        this.props.history.push(`/create-address/${this.state.id}`);
    }
    editAddress = (addressId) => {
        setTimeout(() => {
            this.props.history.push(
                `/update-address/${addressId}/${this.state.id}`
            );
        }, 1000);
    };
    back() {
        setTimeout(() => {
            this.props.history.push('/');
        }, 1000);
    }
    summaryDelete = (summaryId) => {
        setTimeout(() => {
            WorkService.deleteWork(summaryId).then((res) => {
                this.setState({
                    summary: this.state.summary.filter(
                        (summ) => summ.id !== summaryId
                    ),
                });
            });
        }, 1000);
    };
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllSummaries(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.usersPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllSummaries(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllSummaries(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.justCurrentPage <
            Math.ceil(this.state.totalElements / this.state.usersPerPage)
        ) {
            this.findAllSummaries(this.state.justCurrentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);

        this.findAllSummaries(targetPage);

        this.setState({
            [event.target.name]: targetPage,
        });
    };
    firstPageReco = () => {
        let firstPage = 1;
        if (this.state.justCurrentPage > firstPage) {
            this.findAllRecommendations(firstPage);
        }
    };
    lastPageReco = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.justPerPage
        );
        if (this.state.justCurrentPage < condition) {
            this.findAllRecommendations(condition);
        }
    };
    prevPageReco = () => {
        let prevPage = 1;
        if (this.state.justCurrentPage > prevPage) {
            this.findAllRecommendations(this.state.justCurrentPage - prevPage);
        }
    };
    nextPageReco = () => {
        if (
            this.state.justCurrentPage <
            Math.ceil(this.state.totalElements / this.state.justPerPage)
        ) {
            this.findAllRecommendations(this.state.justCurrentPage + 1);
        }
    };
    changePageReco = (event) => {
        let targetPage = parseInt(event.target.value);

        this.findAllRecommendations(targetPage);

        this.setState({
            [event.target.name]: targetPage,
        });
    };
    render() {
        const { currentPage, totalPages, justCurrentPage } = this.state;

        return (
            <div>
                <div className='container'>
                    <div className='main-body'>
                        <div>
                            <div className='row gutters-sm'>
                                <div className='col-md-4 mb-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='d-flex flex-column align-items-center text-center'>
                                                <img
                                                    className='img-thumbnail'
                                                    src={`data:image/*;base64,${this.state.userInformation.accountImage}`}
                                                    alt=''
                                                />

                                                <div className='mt-3'>
                                                    {this.state.userInformation
                                                        .id ? (
                                                        <button
                                                            className='col btn btn-dark-moon btn-rounded'
                                                            onClick={() =>
                                                                this.addImageAccount(
                                                                    this.state
                                                                        .userInformation
                                                                        .id
                                                                )
                                                            }
                                                            style={{
                                                                marginLeft:
                                                                    '10px',
                                                            }}
                                                        >
                                                            {this.state
                                                                .userInformation
                                                                .accountImage
                                                                ? 'Изменить'
                                                                : 'Добавить'}
                                                        </button>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>

                                <div className='col-md-8'>
                                    <div className='card mb-4'>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Ваша фамилие
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.surname}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Ваша имя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.name}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Ваша почта
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.username}
                                                </div>
                                            </div>
                                            <hr />


                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                    <button
                                                        onClick={() =>
                                                            this.editUser(
                                                                this.state.user
                                                                    .id
                                                            )
                                                        }
                                                        className='col btn btn-dark-moon btn-rounded'
                                                    >
                                                        Изменить данные
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Container className='card mb-3'>
                                    <div className='card-body'>
                                        <Row>
                                            <Col>
                                                <Tabs
                                                    defaultActiveKey='данныеПользователя'
                                                    id='controlled-tab-example'
                                                >
                                                    <Tab
                                                        eventKey='данныеПользователя'
                                                        title='Данные пользователя'
                                                    >
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <br />
                                                                <h6 className='mb-0'>
                                                                    Ваш пол:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                <br />
                                                                {
                                                                    this
                                                                        .state
                                                                        .userInformation
                                                                        .genre
                                                                }
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Ваш
                                                                    возраст:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .userInformation
                                                                        .age
                                                                }
                                                            </div>
                                                        </div>


                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Номер
                                                                    телефона
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .userInformation
                                                                        .phoneNumber
                                                                }
                                                            </div>
                                                        </div>
                                                        <hr />

                                                        <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <button
                                                                    onClick={() => {
                                                                        this
                                                                            .state
                                                                            .userInformation
                                                                            .id
                                                                            ? this.editUserInformation(
                                                                                this
                                                                                    .state
                                                                                    .userInformation
                                                                                    .id
                                                                            )
                                                                            : this.createUserInformation(

                                                                            );
                                                                    }}
                                                                    className='col btn btn-dark-moon btn-rounded'
                                                                >
                                                                    {this
                                                                        .state
                                                                        .userInformation
                                                                        .id
                                                                        ? 'Изменить'
                                                                        : 'Добавить'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                    <Tab
                                                        eventKey='адресПользователя'
                                                        title='Адрес пользователя'
                                                    >
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Город:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .address
                                                                        .city
                                                                }
                                                            </div>
                                                        </div>

                                                               
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Район:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .address
                                                                        .district
                                                                }
                                                            </div>
                                                        </div>

                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Улица:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .address
                                                                        .street
                                                                }
                                                            </div>
                                                        </div>

                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Дом:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .address
                                                                        .house
                                                                }
                                                            </div>
                                                        </div>
                                                        
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Квартира
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .address
                                                                        .apartment
                                                                }
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <button
                                                                    onClick={() => {
                                                                        this
                                                                            .state
                                                                            .address
                                                                            .id
                                                                            ? this.editAddress(
                                                                                this
                                                                                    .state
                                                                                    .address
                                                                                    .id
                                                                            )
                                                                            : this.createAddress(

                                                                            );
                                                                    }}
                                                                    className='col btn btn-dark-moon btn-rounded'
                                                                >
                                                                    {this
                                                                        .state
                                                                        .address
                                                                        .id
                                                                        ? 'Изменить'
                                                                        : 'Добавить'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Tab>

                                                    <Tab
                                                        eventKey='работы'
                                                        title='Работы'
                                                    >
                                                        <Card
                                                            className={
                                                                'border border-secondary bg-secondary text-white'
                                                            }
                                                        >
                                                            <Card.Header>
                                                                <div
                                                                    style={{
                                                                        float: 'left',
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faUsers
                                                                        }
                                                                    />
                                                                    Список
                                                                    прежних
                                                                    работ
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <Table
                                                                    bordered
                                                                    hover
                                                                    striped
                                                                    variant='secondary'
                                                                >
                                                                    <thead>
                                                                        <tr>
                                                                            <td>
                                                                                Наименование учереждение:
                                                                            </td>
                                                                            <td>
                                                                                Должность:
                                                                            </td>
                                                                            <td>
                                                                                С данной даты работал в компании:
                                                                            </td>
                                                                            <td>
                                                                                По данной даты работал в компании:
                                                                            </td>
                                                                            <td>
                                                                                Полученая итогая сумма:
                                                                            </td>
                                                                            <td>
                                                                                Удаление:
                                                                            </td>
                                                                            <td>
                                                                                Изменить:
                                                                            </td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.summary.map(
                                                                            (
                                                                                summarS
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        summarS.id
                                                                                    }
                                                                                >
                                                                                    <td>
                                                                                        {
                                                                                            summarS.nameOfWork
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            summarS.position
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            summarS.didWorkFrom
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            summarS.didWorkTo
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            summarS.takeSalary
                                                                                        }
                                                                                    </td>


                                                                                    <td>
                                                                                        <button
                                                                                            style={{
                                                                                                marginLeft:
                                                                                                    '10px',
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                this.summaryDelete(
                                                                                                    summarS.id
                                                                                                )
                                                                                            }
                                                                                            className='col btn btn-ultra-voilet'
                                                                                        >
                                                                                            {' '}
                                                                                            Удалить работу
                                                                                        </button>
                                                                                    </td>
                                                                                    <td>
                                                                                        <button
                                                                                            style={{
                                                                                                marginLeft:
                                                                                                    '10px',
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                this.editSummary(
                                                                                                    summarS.id
                                                                                                )
                                                                                            }
                                                                                            className='col btn btn-purple-moon'
                                                                                        >
                                                                                            {' '}
                                                                                            Изменить работу
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                    </tbody>
                                                                </Table>
                                                            </Card.Body>
                                                            <Card.Footer>
                                                                <div
                                                                    style={{
                                                                        float: 'left',
                                                                    }}
                                                                >
                                                                    Страница
                                                                    {
                                                                        currentPage
                                                                    }{' '}
                                                                    от{' '}
                                                                    {
                                                                        totalPages
                                                                    }
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        float: 'right',
                                                                    }}
                                                                >
                                                                    <InputGroup size='sm'>
                                                                        <InputGroup.Prepend>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage ===
                                                                                        1
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={
                                                                                    this
                                                                                        .firstPage
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faFastBackward
                                                                                    }
                                                                                />{' '}
                                                                                Первая
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage ===
                                                                                        1
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={
                                                                                    this
                                                                                        .prevPage
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faStepBackward
                                                                                    }
                                                                                />{' '}
                                                                                Пред
                                                                            </Button>
                                                                        </InputGroup.Prepend>
                                                                        <FormControl
                                                                            className={
                                                                                'page-num bg-dark'
                                                                            }
                                                                            name='currentPage'
                                                                            value={
                                                                                currentPage
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .changePage
                                                                            }
                                                                        />
                                                                        <InputGroup.Append>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage ===
                                                                                        totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={
                                                                                    this
                                                                                        .nextPage
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faStepForward
                                                                                    }
                                                                                />{' '}
                                                                                След
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage ===
                                                                                        totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={
                                                                                    this
                                                                                        .lastPage
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faFastForward
                                                                                    }
                                                                                />{' '}
                                                                                Последняя
                                                                            </Button>
                                                                        </InputGroup.Append>
                                                                    </InputGroup>
                                                                </div>
                                                            </Card.Footer>
                                                        </Card>
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-12'>
                                                                <button
                                                                    onClick={() => {
                                                                        this.addSummary(

                                                                        );
                                                                    }}
                                                                    className='col btn btn-dark-moon btn-rounded'
                                                                >
                                                                    Добавить
                                                                    работу
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                    <Tab
                                                        eventKey='Учетвыдачипенсии'
                                                        title='Учет выдачи пенсии'
                                                      
                                                    >
                                                         <Card
                                                            className={
                                                                'border border-secondary bg-secondary text-white'
                                                            }
                                                        >
                                                            <Card.Header>
                                                                <div
                                                                    style={{
                                                                        float: 'left',
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faUsers
                                                                        }
                                                                    />
                                                                    Список выданных пенсий
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <Table
                                                                    bordered
                                                                    hover
                                                                    striped
                                                                    variant='secondary'
                                                                >
                                                                    <thead>
                                                                        <tr>
                                                                            <td>
                                                                                Дата:
                                                                            </td>
                                                                            <td>
                                                                                Сумма:
                                                                            </td>


                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.resommendationEmployer.map(
                                                                            (
                                                                                recomm
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        recomm.id
                                                                                    }
                                                                                >
                                                                                    <td>
                                                                                        <td>{recomm.date}</td>

                                                                                    </td>
                                                                                    <td>
                                                                                        <td>{recomm.salary}</td>

                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                    </tbody>
                                                                </Table>
                                                            </Card.Body>
                                                            <Card.Footer>
                                                                <div
                                                                    style={{
                                                                        float: 'left',
                                                                    }}
                                                                >
                                                                    Страница
                                                                    {
                                                                        justCurrentPage
                                                                    }{' '}
                                                                    от{' '}
                                                                    {
                                                                        totalPages
                                                                    }
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        float: 'right',
                                                                    }}
                                                                >
                                                                    <InputGroup size='sm'>
                                                                        <InputGroup.Prepend>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    justCurrentPage ===
                                                                                        1
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={
                                                                                    this
                                                                                        .firstPage
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faFastBackward
                                                                                    }
                                                                                />{' '}
                                                                                Первая
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    justCurrentPage ===
                                                                                        1
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={
                                                                                    this
                                                                                        .prevPageReco
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faStepBackward
                                                                                    }
                                                                                />{' '}
                                                                                Пред
                                                                            </Button>
                                                                        </InputGroup.Prepend>
                                                                        <FormControl
                                                                            className={
                                                                                'page-num bg-dark'
                                                                            }
                                                                            name='justCurrentPage'
                                                                            value={
                                                                                justCurrentPage
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .changePageReco
                                                                            }
                                                                        />
                                                                        <InputGroup.Append>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    justCurrentPage ===
                                                                                        totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={
                                                                                    this
                                                                                        .nextPageReco
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faStepForward
                                                                                    }
                                                                                />{' '}
                                                                                След
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    justCurrentPage ===
                                                                                        totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={
                                                                                    this
                                                                                        .lastPageReco
                                                                                }
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faFastForward
                                                                                    }
                                                                                />{' '}
                                                                                Последняя
                                                                            </Button>
                                                                        </InputGroup.Append>
                                                                    </InputGroup>
                                                                </div>


                                                            </Card.Footer>

                                                        </Card>
                                                        <hr />

                                                    </Tab>
                                                    <Tab
                                                        eventKey='данныеОВыходеНаПенсию'
                                                        title='Данные о выходе на пенсию'
                                                    >
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Дата выхода на пенсию:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .retirement
                                                                        .date
                                                                }
                                                            </div>
                                                        </div>


                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Причина выхода на пенсию:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .retirement
                                                                        .reason
                                                                }
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Установленная сумма пенсии:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {
                                                                    this
                                                                        .state
                                                                        .retirement
                                                                        .theEstablishedPension
                                                                }  рублей
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                </Tabs>
                                            </Col>
                                        </Row>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;