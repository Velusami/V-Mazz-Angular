import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, Cart, Item, OrderSummary, PageResult, User } from './models';

@Injectable({ providedIn:'root' })
export class ApiService {
  private http=inject(HttpClient);
  readonly baseUrl='http://localhost:8080/api/v1';
  private params(values:Record<string,string|number|boolean|null|undefined>){let p=new HttpParams();Object.entries(values).forEach(([k,v])=>{if(v!==null&&v!==undefined&&v!=='')p=p.set(k,String(v));});return p;}

  // Authentication and profile
  login(email:string,password:string){return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`,{email,password});}
  registerCustomer(body:any){return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register-customer`,body);}
  registerCompany(body:any){return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register-company`,body);}
  me(){return this.http.get<User>(`${this.baseUrl}/auth/me`);}
  profile(){return this.http.get<User>(`${this.baseUrl}/profile`);}
  uploadProfileImage(file:File){const form=new FormData();form.append('file',file);return this.http.post<User>(`${this.baseUrl}/profile/image`,form);}

  // Public catalog
  getItems(filters:any={}){return this.http.get<PageResult<Item>>(`${this.baseUrl}/catalog/items`,{params:this.params({page:0,size:24,sort:'newest',...filters})});}
  getItem(id:number){return this.http.get<Item>(`${this.baseUrl}/catalog/items/${id}`);}
  getCategories(){return this.http.get<any[]>(`${this.baseUrl}/catalog/categories`);}
  getUoms(){return this.http.get<string[]>(`${this.baseUrl}/catalog/uoms`);}

  // Cart and customer purchase orders
  getCart(){return this.http.get<Cart>(`${this.baseUrl}/cart`);}
  addToCart(itemId:number,quantity:number){return this.http.post<Cart>(`${this.baseUrl}/cart/items`,{itemId,quantity});}
  updateCartItem(itemId:number,quantity:number){return this.http.put<Cart>(`${this.baseUrl}/cart/items/${itemId}`,{quantity});}
  removeCartItem(itemId:number){return this.http.delete<Cart>(`${this.baseUrl}/cart/items/${itemId}`);}
  clearCart(){return this.http.delete<Cart>(`${this.baseUrl}/cart`);}
  checkout(body:any){return this.http.post<any>(`${this.baseUrl}/orders/checkout`,body);}
  myOrders(page=0,size=20){return this.http.get<PageResult<OrderSummary>>(`${this.baseUrl}/orders`,{params:this.params({page,size})});}
  myOrder(id:number){return this.http.get<any>(`${this.baseUrl}/orders/${id}`);}
  cancelOrder(id:number){return this.http.post<any>(`${this.baseUrl}/orders/${id}/cancel`,{});}

  // Supplier/admin workspace
  adminItem(id:number){return this.http.get<Item>(`${this.baseUrl}/admin/items/${id}`);}
  adminItems(filters:any={}){return this.http.get<PageResult<Item>>(`${this.baseUrl}/admin/items`,{params:this.params({page:0,size:50,...filters})});}
  uploadItemImage(file:File){const form=new FormData();form.append('file',file);return this.http.post<{imageUrl:string}>(`${this.baseUrl}/admin/items/images`,form);}
  createItem(body:any){return this.http.post<Item>(`${this.baseUrl}/admin/items`,body);}
  updateItem(id:number,body:any){return this.http.put<Item>(`${this.baseUrl}/admin/items/${id}`,body);}
  updateStock(id:number,availableQuantity:number){return this.http.put<Item>(`${this.baseUrl}/admin/items/${id}/stock`,{availableQuantity});}
  deactivateItem(id:number){return this.http.delete<Item>(`${this.baseUrl}/admin/items/${id}`);}
  adminOrders(status?:string){return this.http.get<PageResult<OrderSummary>>(`${this.baseUrl}/admin/orders`,{params:this.params({page:0,size:50,status})});}
  adminOrder(id:number){return this.http.get<any>(`${this.baseUrl}/admin/orders/${id}`);}
  updateOrderStatus(id:number,status:string){return this.http.put<any>(`${this.baseUrl}/admin/orders/${id}/status`,{status});}
  adminUser(id:number){return this.http.get<User>(`${this.baseUrl}/admin/users/${id}`);}
  adminUsers(){return this.http.get<PageResult<User>>(`${this.baseUrl}/admin/users`,{params:this.params({page:0,size:50})});}
  createUser(body:any){return this.http.post<User>(`${this.baseUrl}/admin/users`,body);}
  updateUser(id:number,body:any){return this.http.put<User>(`${this.baseUrl}/admin/users/${id}`,body);}
  updateUserStatus(id:number,status:string){return this.http.put<User>(`${this.baseUrl}/admin/users/${id}/status`,{status});}
  company(){return this.http.get<any>(`${this.baseUrl}/admin/company`);}
  updateCompany(body:any){return this.http.put<any>(`${this.baseUrl}/admin/company`,body);}

  // AI sourcing tools
  askAgent(question:string,conversationId?:string){return this.http.post<{conversationId:string;answer:string}>(`${this.baseUrl}/ai/agent/chat`,{question,conversationId});}
  clearAgentMemory(id:string){return this.http.delete<any>(`${this.baseUrl}/ai/agent/memory/${encodeURIComponent(id)}`);}
  askRag(query:string){return this.http.post<any>(`${this.baseUrl}/ai/products/rag`,{query});}
  askAi(question:string){return this.http.get<any>(`${this.baseUrl}/ai/ask`,{params:{question}});}
  hybridSearch(query:string){return this.http.post<any>(`${this.baseUrl}/ai/products/hybrid-search`,{query});}
  intelligentSearch(query:string){return this.http.get<any[]>(`${this.baseUrl}/ai/products/intelligent-search`,{params:{query}});}
  elasticSearch(keyword:string){return this.http.get<any[]>(`${this.baseUrl}/products/search`,{params:{keyword}});}
  alternates(mpn:string,options:any={}){return this.http.get<any>(`${this.baseUrl}/ai/products/alternates`,{params:this.params({mpn,...options})});}
  bomMatch(rows:any[],includeAlternates=true){return this.http.post<any>(`${this.baseUrl}/ai/bom/match`,{rows,includeAlternates});}
  bomCsv(file:File,includeAlternates=true){const form=new FormData();form.append('file',file);form.append('includeAlternates',String(includeAlternates));return this.http.post<any>(`${this.baseUrl}/ai/bom/match/csv`,form);}
}
