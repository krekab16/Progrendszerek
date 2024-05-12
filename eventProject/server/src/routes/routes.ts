import { Router, Request, Response, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Event } from '../model/Event';

import { Cart } from '../model/Cart';
import { Order } from '../model/Order';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {


    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = new User({email: email, password: password});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });



    router.post('/createEvent',  (req: Request, res: Response) => {
        const name = req.body.name;
        const date = req.body.date;
        const location = req.body.location;
        const description = req.body.description;
        const ticketPrice = req.body.ticketPrice;
        const ticketNumber = req.body.ticketNumber;
        const ticketCategory = req.body.ticketCategory;
    
        const event = new Event({
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

    router.get('/getAllEvents', (req: Request, res: Response) => {
        const query = Event.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });


   
    router.get('/getEventById', (req: Request, res: Response) => {
        const id = req.query.id; 
        Event.findById(id) 
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


    router.delete('/deleteEvent', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = Event.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });



    router.post('/addToCart', (req: Request, res: Response) => {
        const userId = req.body.userId;
        const event = req.body.event;

            const cart = new Cart({
                userId: userId,
                event: event,
            });
            cart.save().then(data => {
                res.status(200).send(data);
                console.log(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        
    });


    router.post('/addOrder', (req: Request, res: Response) => {
        const userId = req.body.userId;
        const event = req.body.event;

            const order = new Order({
                userId: userId,
                event: event,
            });
            order.save().then(data => {
                res.status(200).send(data);
                console.log(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        
    });


    router.get('/getMyCart', (req: Request, res: Response) => {
        const id = req.query.id;
        
        Cart.find() 
        .populate('event')
                 .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
    });



    router.get('/getMyOrder', (req: Request, res: Response) => {
        const id = req.query.id;
        
        Order.find() 
        .populate('event')
                 .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
    });



    router.delete('/deleteFromCart', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
        const eventId = req.query.id;
        const query = Cart.deleteOne({ _id : eventId });
        query.then(data => {
            res.status(200).send(data);
            console.log("Sikeres törlés");
            console.log(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Belső szerverhiba.');
        })
         } else {
            res.status(500).send('User is not logged in.');
        }
    });


     router.put('/updateEvent', async (req: Request, res: Response) => {
        try {
            const id = req.query.id;
            const updatedEventData = req.body; 
            console.log("Received event data:", updatedEventData);
            
            const updatedEvent = await Event.findByIdAndUpdate(id, updatedEventData, { new: true });
            console.log("Updated event:", updatedEvent);
    
            if (!updatedEvent) {
                return res.status(404).send('Az esemény nem található');
            }
    
            res.status(200).send(updatedEvent);
        } catch (error) {
            console.error(error);
            res.status(500).send('Belső szerverhiba.');
        }
    });
    

    
    return router;
}