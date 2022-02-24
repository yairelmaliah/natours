import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51KWQPVHXeha5k9oqcWIIlOe7GHGnaHeUSAwob7MvkhuKN49U73WSwA6epnpCBmjn4h5Fq8a0TLW3rS3Ifyo4G9zL002no9YEyM'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/booking/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert(error.response.data.message);
  }
};
