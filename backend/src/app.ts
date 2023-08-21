import express, { Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

import authRoutes from './routes/auth.routes';
import postsRoutes from './routes/posts.routes';

app.set('port', 3000);

//middleware
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

export default app;