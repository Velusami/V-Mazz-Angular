export interface PageResult<T> { content: T[]; page: number; size: number; totalElements: number; totalPages: number; }
export interface Item {
  id:number; itemCode:string; itemName:string; category:string; categoryName?:string; subCategory?:string; brand?:string;
  description?:string; specification?:string; hsnCode?:string; uom:string; unitPrice:number; mrp?:number; discountPercent?:number;
  currency:string; taxPercent?:number; availableQuantity:number; minOrderQuantity:number; inStock:boolean; imageUrl?:string;
  status?:string; supplierCompanyId?:number; supplierName?:string;
}
export interface User { id:number; fullName:string; email:string; mobile?:string; role:'ADMIN'|'SUB_ADMIN'|'CUSTOMER'; status:string; companyName?:string; profileImageUrl?:string; }
export interface AuthResponse { accessToken:string; tokenType:string; expiresInSeconds:number; user:User; }
export interface CartItem { itemId:number; itemCode:string; itemName:string; imageUrl?:string; supplierName:string; unitPrice:number; currency:string; quantity:number; lineTotal:number; available:boolean; issue?:string; uom:string; }
export interface Cart { items:CartItem[]; totalLines:number; currency:string; subTotal:number; taxTotal:number; grandTotal:number; hasUnavailableItems:boolean; }
export interface OrderSummary { id:number; poNumber:string; status:string; orderDate:string; customerName:string; supplierName:string; itemCount:number; currency:string; grandTotal:number; }
export interface ChatMessage { role:'user'|'assistant'; text:string; }
