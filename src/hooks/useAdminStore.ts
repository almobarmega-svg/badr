import { useState, useEffect } from 'react';
import { ProductRecord, CustomerRecord, SaleRecord } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CUSTOMERS, INITIAL_SALES } from '../data/initialAdminData';

const PRODUCTS_KEY = 'albadr_products_data_v1';
const CUSTOMERS_KEY = 'albadr_customers_data_v1';
const SALES_KEY = 'albadr_sales_data_v1';

export function useAdminStore() {
  const [products, setProducts] = useState<ProductRecord[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [customers, setCustomers] = useState<CustomerRecord[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMERS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [sales, setSales] = useState<SaleRecord[]>(() => {
    try {
      const saved = localStorage.getItem(SALES_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SALES;
    } catch {
      return INITIAL_SALES;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem(SALES_KEY, JSON.stringify(sales));
    } catch (e) {
      console.error(e);
    }
  }, [sales]);

  // Products CRUD
  const addProduct = (newProduct: Omit<ProductRecord, 'id' | 'createdAt'>) => {
    const product: ProductRecord = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id: string, updatedFields: Partial<ProductRecord>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Customers CRUD
  const addCustomer = (newCustomer: Omit<CustomerRecord, 'id' | 'joinDate' | 'totalSpent'>) => {
    const customer: CustomerRecord = {
      ...newCustomer,
      id: `cust-${Date.now()}`,
      joinDate: new Date().toISOString().split('T')[0],
      totalSpent: 0,
    };
    setCustomers((prev) => [customer, ...prev]);
    return customer;
  };

  const updateCustomer = (id: string, updatedFields: Partial<CustomerRecord>) => {
    setCustomers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((item) => item.id !== id));
  };

  // Sales Operations
  const addSale = (saleData: {
    customerId: string;
    customerName: string;
    companyName: string;
    items: { productId: string; productName: string; quantity: number; unitPrice: number; total: number }[];
    discount: number;
    paymentMethod: 'مدى (Mada)' | 'تحويل بنكي' | 'بطاقة ائتمانية' | 'نقدي';
    paymentStatus?: 'paid' | 'pending' | 'cancelled';
  }) => {
    const subtotal = saleData.items.reduce((sum, item) => sum + item.total, 0);
    const afterDiscount = Math.max(0, subtotal - saleData.discount);
    const vatAmount = afterDiscount * 0.15; // 15% ZATCA VAT
    const grandTotal = afterDiscount + vatAmount;

    const newSale: SaleRecord = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: saleData.customerId,
      customerName: saleData.customerName,
      companyName: saleData.companyName,
      date: new Date().toISOString().split('T')[0],
      items: saleData.items,
      subtotal,
      discount: saleData.discount,
      vatAmount,
      grandTotal,
      paymentMethod: saleData.paymentMethod,
      paymentStatus: saleData.paymentStatus || 'paid',
      zatcaQrCode: `ZATCA-EINV-${Date.now()}-APPROVED`,
    };

    setSales((prev) => [newSale, ...prev]);

    // Update customer total spent
    if (saleData.paymentStatus !== 'cancelled') {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === saleData.customerId
            ? { ...c, totalSpent: (c.totalSpent || 0) + grandTotal }
            : c
        )
      );
    }

    return newSale;
  };

  const updateSaleStatus = (id: string, status: 'paid' | 'pending' | 'cancelled') => {
    setSales((prev) =>
      prev.map((s) => (s.id === id ? { ...s, paymentStatus: status } : s))
    );
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCustomers(INITIAL_CUSTOMERS);
    setSales(INITIAL_SALES);
    try {
      localStorage.removeItem(PRODUCTS_KEY);
      localStorage.removeItem(CUSTOMERS_KEY);
      localStorage.removeItem(SALES_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    products,
    customers,
    sales,
    addProduct,
    updateProduct,
    deleteProduct,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addSale,
    updateSaleStatus,
    resetToDefaults,
  };
}
