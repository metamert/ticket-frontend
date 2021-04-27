import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const StripeCheckoutButton = ({ price,id,tripId ,up,seat,email}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IfIBdKesAhY23VMsn8eVlFoIGNrK1xdlsCLRbBhHV0BHLa4wAnucX4DoIz928M8AubbVesXAyW4wZRA6rTxSqq600U9eDtBu9';

  const onToken = token => {
      console.log("id",id)
    axios({
      url: 'http://localhost:3000/users/payment',
      method: 'post',
      data: {
        amount:priceForStripe,
        token: token,
        userId:id,
        tripId:tripId,
        seat:seat
      }
    })
      .then(response => {
        toast.success('succesful payment');
        up()
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        toast.error('There was an issue with your payment! Please make sure you use the provided credit card.')
      
      });
  };
  console.log(email)

  return (
    <StripeCheckout
      label='Ödeme Yap'
      name='Orkun Turizm'
     email={email}
    image="https://www.isparta.edu.tr/assetsv2/images/logo.svg"
      description={`Toplam tutar ${price} TL`}
      amount={priceForStripe}
      panelLabel='Ödeme Yap'
     
      currency="TRY"
      bitcoin
     allowRememberMe={true}
   
     billingAddress
     
     token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;