import mongoose from 'mongoose';

export const connectToDB = async () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  if (!process.env.MONGODB_URI) throw new Error('몽고DB URI 없음');

  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        writeConcern: {
          w: 'majority',
        },
      });
      console.log('몽고DB 연결 성공');
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('몽고DB 이미 연결됨');
    return;
  }
};
