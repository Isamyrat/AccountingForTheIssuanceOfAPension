import React, { Component } from 'react';
import AddressService from '../../services/address/AddressService';

class CreateAddressComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressId: this.props.match.params.addressId,
              city: '',
              district: '',
              street: '',
              house: '',
              apartment: '',
            idUser: this.props.match.params.idUser,

        };
        this.saveAddress = this.saveAddress.bind(this);
    }
    componentDidMount = () => {
        const id = this.state.addressId;

        if (id) {
            this.findAddressById(id);
        }
       
    };
    findAddressById = (id) => {
        setTimeout(() => {
            AddressService.getById(
                id
            ).then((res) => {
                let address = res.data;

                if (address != null) {
                    this.setState({
                        city: address.city,
                        district: address.district,
                        street: address.street,
                        house: address.house,
                        apartment: address.apartment,
                    });
                }
            });
        }, 1000);
    };
  
    addressChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    saveAddress = (e) => {
        e.preventDefault();
        const userId = this.state.idUser;
        let address = {
            city: this.state.city,
            district: this.state.district,
            street: this.state.street,
            house: this.state.house,
            apartment: this.state.apartment,
        };

        console.log('address => ' + JSON.stringify(address));

        AddressService.createAddress(
            userId,
            address
        ).then(() => {

                this.props.history.push(
                    `/profile/${this.state.idUser}`
                );
          

        });
    };
    updateAddress = (e) => {
        e.preventDefault();
        const addressId = this.state.addressId;
        let address = {
            id: addressId,
            city: this.state.city,
            district: this.state.district,
            street: this.state.street,
            house: this.state.house,
            apartment: this.state.apartment,
        };

        console.log('address => ' + JSON.stringify(address));
        AddressService.updateAddress(address).then(
            () => {

                    this.props.history.push(
                        `/profile/${this.state.idUser}`
                    );
              

            }
        );
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
                                {this.state.addressId
                                    ? 'Изменение адресных данных'
                                    : 'Добавление адресных данных'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.addressId
                                            ? this.updateAddress
                                            : this.saveAddress
                                    }
                                >
                                    <div className='form-group'>
                                        <label>Город в котором проживаете:</label>
                                        <input
                                            placeholder='Город в котором проживаете:'
                                            name='city'
                                            className='form-control'
                                            value={this.state.city}
                                            onChange={
                                                this.addressChange
                                            }
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Район в котором проживаете:</label>
                                        <input
                                            placeholder='Район в котором проживаете:'
                                            name='district'
                                            className='form-control'
                                            value={this.state.district}
                                            onChange={
                                                this.addressChange
                                            }
                                        />
                                    </div>
                                 
                                    <div className='form-group'>
                                        <label>Улица в котором проживаете::</label>
                                        <input
                                            placeholder='Улица в котором проживаете:'
                                            name='street'
                                            className='form-control'
                                            value={this.state.street}
                                            onChange={
                                                this.addressChange
                                            }
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Номер дома в котором проживаете:</label>
                                        <input
                                            placeholder='Номер дома в котором проживаете:'
                                            name='house'
                                            className='form-control'
                                            value={this.state.house}
                                            onChange={
                                                this.addressChange
                                            }
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Номер квартиры в котором проживаете::</label>
                                        <input
                                            placeholder='Номер квартиры в котором проживаете:'
                                            name='apartment'
                                            className='form-control'
                                            value={this.state.apartment}
                                            onChange={
                                                this.addressChange
                                            }
                                        />
                                    </div>
                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.addressId
                                                ? this.updateAddress
                                                : this.saveAddress
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

export default CreateAddressComponent;
