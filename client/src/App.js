import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import logoSmall from './logo_small.png';
import './App.css';
import Services from './Services';
import conf from './conf.json';
import {NavDropdown} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Login from "./components/Login";

const {Component} = require('react');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            menu: false,
            products: null,
            showLogin: false,
        };
        this.request = {
            data: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.loadServices = this.loadServices.bind(this);
        this.removeInvalidMessage = this.removeInvalidMessage.bind(this);
        this.hideLogin = this.hideLogin.bind(this);
        this.showLogin = this.showLogin.bind(this);
    }

    showLogin = () => {
        this.setState({showLogin: true})
    }

    hideLogin = () => {
        this.setState({showLogin: false})
    }

    removeInvalidMessage(event) {
        console.log(event.target.name);
        console.log(event.target.value);
        this.request.data[event.target.id] = event.target.value;
        console.log('this.request: ', this.request);
        if (!event.target.value === false) {
            event.target.nextElementSibling.classList.remove('d-block');
        } else {
            event.target.nextElementSibling.classList.add('d-block');
        }
    }

    showHeader() {
        alert('is clicked');
    }

    handleSubmit(event) {
        let frmContact = document.querySelector('.needs-validation');
        let sliceFrmInputs = Array.prototype.slice.call(frmContact);
        let isValidate = true;

        for (let i = 0; i < sliceFrmInputs.length; i++) {
            if (!sliceFrmInputs[i].checkValidity()) {

                if (!sliceFrmInputs[i].nextElementSibling === false) {
                    sliceFrmInputs[i].nextElementSibling.classList.add('d-block');
                }
                isValidate = false;
            }
            this.request.data[sliceFrmInputs[i].id] = sliceFrmInputs[i].value;
            sliceFrmInputs[i].classList.add('was-validated');
        }

        if (isValidate) {
            console.log('this.request:', this.request);
            this.saveInquiries().then(function () {
                console.log('saveInquiries is successful:', true);
            });
        } else {
            console.log('submit is failed:', true);
        }

        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    async saveInquiries() {

        let data = this.request.data;
        let inquirieData = {
            'name': data.username,
            'message': data.usermessage,
            'mail': data.usermail,
            'subject': data.usersubject
        };

        console.log('inquirieData: ', inquirieData);
        // return false;

        const requestOpt = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(inquirieData)
        };

        const response = await fetch(conf.api.save, requestOpt);
        let state = false;
        console.log('response:', response);
        await response.json().then(function (value) {
                console.log('value:', value);
                state = true;
            },
            function (error) {
                console.error('error:', error);
            });

        return state;
    }

    loadServices() {

        let htmlElements = {
            container: 'container1',
            canvas: 'scene1',
            labels: 'labels1',
            color1: 0x4dff4d,
            color2: 0x06c4f9,
            color3: 0xffaa00
        }
        console.log('loadServices: ', htmlElements);
        Services('Node.js', 'React', 'NoSQL', htmlElements);

        htmlElements = {
            container: 'container3',
            canvas: 'scene3',
            labels: 'labels3',
            color1: 0xd2ff4d,
            color2: 0x4080bf,
            color3: 0x85adad
        }
        Services('Beratung', 'Wartung', 'Development', htmlElements);


        htmlElements = {
            container: 'container2',
            canvas: 'scene2',
            labels: 'labels2',
            color1: 0xff751a,
            color2: 0x1affff,
            color3: 0xffff00
        }
        Services('PHP', 'HTML', 'JS', htmlElements);
    }

    handleChange(e) {
        if (!e === false) {
            console.log('handleChange: ', e);
            this.setState({
                [e.target.name]: e.target.value
            });

            // this.request({
            //     [e.target.name]: e.target.value,
            // });
            // console.log('this.request: ', this.request);
        }
    }

    async getProducts() {
        const response = await fetch(conf.api.getProducts);
        let products = {};
        await response.json().then(function (value) {
                products = value;
            },
            function (error) {
                console.error(error);
            });

        return products;
    }

    async componentDidMount() {
        window.addEventListener('load', (event) => {
            this.loadServices()
        });
        const products = await this.getProducts();
        this.setState({
            data: 'test',
            products: !products ? {} : products,
        });
    }

    render() {
        let products = {};
        if (!(!this.state.products)) {
            products = this.state.products;
        }
        // const { data } = !this.state.data ? false : this.state.data;
        console.log('products:products: ', products);
        console.log('this.state.productss: ', this.state.products);
        // const show = (this.state.menu) ? "show" : "" ;

        return (
            <div className="App">
                <header className="App-header">
                    <Router>
                        <div className="pos-f-t">
                            <div className="collapse" id="menuHeader">
                                <div className="row">
                                    <div className="col-sm-2 bg-dark p-4">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="menuHeaderLinkContent">
                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page"
                                                   href="#main-section-presentation">Home</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#main-section-services">Services</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#main-section-about">About</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#main-section-contact">Contact</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-8 bg-dark p-4">
                                        <div className="bg-dark p-4">
                                            <h4 className="text-white">IT-VladimirMiovcic</h4>
                                            <img src={logoSmall} className="App-logo-small" alt="Logo"/>
                                        </div>
                                    </div>
                                    <div className="col-2 bg-dark p-4 border-2 link-info">
                                    </div>
                                </div>
                            </div>
                            <nav className="navbar navbar-dark bg-dark" id="navBarContent">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#menuHeader"
                                        aria-controls="menuHeader" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <NavDropdown id="userMenuHeader" title={<Icon.Person size={20}/>} className="dropdown">
                                    <NavDropdown.Item href="#main-section-services" className="dropdown-item">
                                        Registrierung
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={
                                        () => this.showLogin()} className="dropdown-item">
                                        Login
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </nav>
                        </div>
                    </Router>
                </header>
                <main className="App-main" style={{overflowX: `hidden`}}>
                    <section className="main-section-presentation" id="main-section-presentation">
                        <div className="container">
                            < div id="presentation-label" className="display-4">
                                <p>Wilkommen bei IT-VladimirMiovcic</p>
                                <p>Web-Development mit modernen Technologien.</p>
                                <div>
                                    <span>Möchten Sie uns gleich kontaktieren:</span>
                                    <a className="nav-link" href="#main-section-contact">Contact</a>
                                    <span>oder schauen Sie sich lieber unser Angebot vorab:</span>
                                    <a className="nav-link" href="#main-section-services">Services</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="main-section-services" id="main-section-services">
                        <div className="container">

                            <h2 className="display-4 font-italic">Services</h2>
                            <div className="row" id="servicesDynamicContent">

                            </div>
                            <div className="row">
                                <div className="col">
                                    <p id="services-text-content"
                                       className="display-4 font-italic text-break text-left">
                                        Unsere oben dargestellten Technologien sichern dir ein Online-Erlebnis,
                                        dass gewählte Geschäftsprozesse, Präsentationen, Blogs oder auch individuelle
                                        Vorhaben abbildet.
                                    </p>
                                </div>
                            </div>
                            {products.length > 0 &&
                                <div id="productsContent" className="table-responsive">
                                    <table className="table text-start">
                                        <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Beschreibung</td>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {products.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </section>
                    <section className="main-section-about" id="main-section-about">

                        <h2 id="section-about-label" className="display-4">About</h2>
                        <div className="container" id="section-about-content">
                            {/*here is a img as background*/}
                        </div>
                    </section>
                    <section className="main-section-contact" id="main-section-contact">
                        <div className="container-fluid" id="section-contact-container">
                            <div className="row" id="contact-row-header">
                                <span id="section-contact-label" className="display-4 font-italic">Contact</span>
                            </div>
                            <div className="row" id="contact-row-main">
                                <div className="container-fluid">
                                    <div className="row" id="frm-contact-label">
                                        <div className="col-md-6">
                                            <h2>Kontaktdetails</h2>
                                        </div>
                                        <div className="col-md-6">
                                            <h2>Standort</h2>
                                        </div>
                                    </div>
                                    <div className="row-fluid" id="frm-contact-content">
                                        <form id="frm-contact" className="row g-1 needs-validation"
                                              onSubmit={(e) => {
                                                  this.handleSubmit(e)
                                              }} method="post" noValidate={true}>
                                            <div className="row" id="frm-inner-row1">
                                                <div className="col">
                                                    <div className="row" id="inner-row-phone">
                                                        <div className="col" id="phoneIcon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                 height="16" fill="currentColor"
                                                                 className="bi bi-telephone" viewBox="-3 -3 22 22">
                                                                <path
                                                                    d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                                            </svg>
                                                        </div>
                                                        <div className="col">
                                                            <div className="col">Tel:</div>
                                                            <div className="col"><a
                                                                href="tel:+49(0)1637414354">+49(0)1637414354</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="row" id="inner-row-mail">
                                                        <div className="col" id="mailIcon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                 height="16" fill="currentColor"
                                                                 className="bi bi-envelope" viewBox="-3 -3 22 22">
                                                                <path
                                                                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                                                            </svg>
                                                        </div>
                                                        <div className="col">
                                                            <div className="col">Email:</div>
                                                            <div className="col"><a
                                                                href="mailto:vladimirmiovcic@yahoo.de">vladimirmiovcic@yahoo.de</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="row" id="inner-row-address">
                                                        <div className="col">
                                                            Adresse:
                                                        </div>
                                                        <div className="col" id="address-content">
                                                            <div className="col">Eden Str. 44</div>
                                                            <div className="col">
                                                                30163 Hannover
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" id="frm-inner-row2">
                                            </div>
                                            <div className="row" id="frm-inner-main-content">
                                                <div className="mb-3" id="username-content">
                                                    <label htmlFor="username" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="username"
                                                           onChange={(e) => {
                                                               this.removeInvalidMessage(e)
                                                           }} required="required"/>
                                                    <div className="invalid-feedback">
                                                        Geben Sie bitte einen vollständigen Namen ein.
                                                    </div>
                                                </div>
                                                <div className="mb-3" id="usermail-content">
                                                    <label htmlFor="usermail" className="form-label">Email</label>
                                                    <input type="email" className="form-control" id="usermail"
                                                           onChange={(e) => {
                                                               this.removeInvalidMessage(e)
                                                           }}
                                                           pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                                                           required="required"/>
                                                    <div className="invalid-feedback">
                                                        Geben Sie bitte eine Email im Format: beispiel@bla.de ein.
                                                    </div>
                                                </div>
                                                <div className="mb-3" id="usersubject-content">
                                                    <label htmlFor="usersubject" className="form-label">Betreff</label>
                                                    <input type="text" className="form-control" onChange={(e) => {
                                                        this.removeInvalidMessage(e)
                                                    }} id="usersubject" required="required"/>
                                                    <div className="invalid-feedback">
                                                        Geben Sie bitte einen Betreff ein.
                                                    </div>
                                                </div>
                                                <div className="mb-3" id="usermessage-content">
                                                    <label htmlFor="usermessage" className="form-label">Ihre
                                                        Nachricht</label>
                                                    <textarea className="form-control" rows="4" id="usermessage"
                                                              onChange={(e) => {
                                                                  this.removeInvalidMessage(e)
                                                              }} required="required">

                                                        </textarea>
                                                    <div className="invalid-feedback">
                                                        Geben Sie bitte einen Nachricht ein.
                                                    </div>
                                                </div>
                                                <div className="mb-3" id="button-content">
                                                    <button type="submit" className="btn btn-primary">Senden</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {this.state.showLogin && <Login setIsOpen={this.state.showLogin} handleClose={this.hideLogin}/>}
                </main>
                <footer className="App-footer">

                </footer>
            </div>
        );
    }
}

export default App;
