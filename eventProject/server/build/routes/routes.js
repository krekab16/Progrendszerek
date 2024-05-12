"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const User_1 = require("../model/User");
const Event_1 = require("../model/Event");
const Cart_1 = require("../model/Cart");
const Order_1 = require("../model/Order");
const configureRoutes = (passport, router) => {
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = new User_1.User({ email: email, password: password });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/createEvent', (req, res) => {
        const name = req.body.name;
        const date = req.body.date;
        const location = req.body.location;
        const description = req.body.description;
        const ticketPrice = req.body.ticketPrice;
        const ticketNumber = req.body.ticketNumber;
        const ticketCategory = req.body.ticketCategory;
        const event = new Event_1.Event({
            name: name,
            date: date,
            location: location,
            description: description,
            ticketPrice: ticketPrice,
            ticketNumber: ticketNumber,
            ticketCategory: ticketCategory,
        });
        event.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.get('/getAllEvents', (req, res) => {
        const query = Event_1.Event.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.get('/getEventById', (req, res) => {
        const id = req.query.id;
        Event_1.Event.findById(id)
            .then(event => {
            if (!event) {
                return res.status(404).send('Esemény nem található');
            }
            res.status(200).send(event);
        })
            .catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.delete('/deleteEvent', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = Event_1.Event.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/addToCart', (req, res) => {
        const userId = req.body.userId;
        const event = req.body.event;
        const cart = new Cart_1.Cart({
            userId: userId,
            event: event,
        });
        cart.save().then(data => {
            res.status(200).send(data);
            console.log(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/addOrder', (req, res) => {
        const userId = req.body.userId;
        const event = req.body.event;
        const order = new Order_1.Order({
            userId: userId,
            event: event,
        });
        order.save().then(data => {
            res.status(200).send(data);
            console.log(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.get('/getMyCart', (req, res) => {
        const id = req.query.id;
        Cart_1.Cart.find()
            .populate('event')
            .then(data => {
            res.status(200).send(data);
        })
            .catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.get('/getMyOrder', (req, res) => {
        const id = req.query.id;
        Order_1.Order.find()
            .populate('event')
            .then(data => {
            res.status(200).send(data);
        })
            .catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.delete('/deleteFromCart', (req, res) => {
        if (req.isAuthenticated()) {
            const eventId = req.query.id;
            const query = Cart_1.Cart.deleteOne({ _id: eventId });
            query.then(data => {
                res.status(200).send(data);
                console.log("Sikeres törlés");
                console.log(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Belső szerverhiba.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.put('/updateEvent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.query.id;
            const updatedEventData = req.body;
            console.log("Received event data:", updatedEventData);
            const updatedEvent = yield Event_1.Event.findByIdAndUpdate(id, updatedEventData, { new: true });
            console.log("Updated event:", updatedEvent);
            if (!updatedEvent) {
                return res.status(404).send('Az esemény nem található');
            }
            res.status(200).send(updatedEvent);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Belső szerverhiba.');
        }
    }));
    return router;
};
exports.configureRoutes = configureRoutes;
