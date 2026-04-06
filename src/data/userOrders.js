export const ORDERS = [
  {
    id: '100',
    address: 'Rua das Flores, 123',
    paymentMethod: 'Pix',
    total: 64.3,
    status: 'Finalizado',
    date: '2026-04-03T18:25:00',
    restaurant: 'Burger House',
    items: [
      {
        id: 1,
        name: 'Hambúrguer Artesanal',
        price: 25.9,
        quantidade: 2,
      },
      {
        id: 2,
        name: 'Batata Frita',
        price: 12.5,
        quantidade: 1,
      },
    ],
  },
  {
    id: '99',
    address: 'Av. Central, 456',
    paymentMethod: 'Cartão de Crédito',
    total: 45.0,
    status: 'Finalizado',
    date: '2026-03-22T23:25:00',
    restaurant: 'Pizzaria Napoli',
    items: [
      {
        id: 3,
        name: 'Pizza Calabresa',
        price: 45.0,
        quantidade: 1,
      },
    ],
  },
];
