import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../services/index';

const NavigationBar = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
    };

    const guestLinks = (
        <>
            <div className='mr-auto'></div>
            <Nav className='navbar-right'>
                <Link to={'/register'} className='nav-link'>
                    <FontAwesomeIcon icon={faUserPlus} /> Зарегистрироваться
                </Link>
                <Link to={'/login'} className='nav-link'>
                    <FontAwesomeIcon icon={faSignInAlt} /> Войти
                </Link>
            </Nav>
        </>
    );
    const userLinks = (
        <>
            <Nav className='mr-auto'>
                <Link
                    to={`profile/${auth.id}`}
                    className='nav-link'
                >
                    Профиль
                </Link>

                {auth.role === 'ROLE_ADMIN' ? (
                    <Link to={`/users`} className='nav-link'>
                        Список пользователей
                    </Link>

                ) : (
                    ' '
                )}
            

                <Link to={'/security-service'} className='nav-link'>
                    Служба поддержки
                </Link>

            </Nav>

            <Nav className='navbar-right'>
                <Link to={'/logout'} className='nav-link' onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Выйти
                </Link>
            </Nav>
        </>
    );

    return (
        <Navbar bg='dark' variant='dark'>
            <Link to={auth.isLoggedIn ? `/home/${auth.id}` : ''} className='navbar-brand'>
              Pension accention
            </Link>
            {auth.isLoggedIn ? userLinks : guestLinks}
        </Navbar>
    );
};

export default NavigationBar;
