export interface checkOutSession {
  details: string;
  phone: string;
  city: string;
}

export interface OrderStatusSuccess {
  status: string;
  session: OrderSession;
}

export interface OrderSession {
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface OrderStatusFail {
  statusMsg: string;
  message: string;
}