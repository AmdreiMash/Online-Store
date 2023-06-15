export const cardLogoObject: object = {
  '3':
    'https://raw.githubusercontent.com/gregoiresgt/payment-icons/919d90075e88275a0f8d324788bd0ed33b667956/Assets/Credit%20Card/AmericanExpress/AmericanExpress-dark.svg',
  '4':
    'https://raw.githubusercontent.com/gregoiresgt/payment-icons/919d90075e88275a0f8d324788bd0ed33b667956/Assets/Credit%20Card/Visa/Visa-card-dark.svg',
  '5':
    'https://raw.githubusercontent.com/gregoiresgt/payment-icons/919d90075e88275a0f8d324788bd0ed33b667956/Assets/Credit%20Card/MasterCard/MasterCard-dark.svg',
  '0':
    'https://raw.githubusercontent.com/gregoiresgt/payment-icons/919d90075e88275a0f8d324788bd0ed33b667956/Assets/Payment/Amazon/Amazon-card-dark.svg',
};

export const getCardIndex = (char: string): string => {
  if (Number(char) > 2 && Number(char) < 6) return char;
  else return '0';
};
