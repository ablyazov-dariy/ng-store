import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductInterface } from '@interfaces/product.interface';
import { LikeService } from '@services/like.service';
import { ProductsService } from '@services/products.service';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminProductsService extends ProductsService {
  constructor(likeService: LikeService, angularFirestore: AngularFirestore) {
    super(likeService, angularFirestore);
  }

  products$ = this.getProductsObservable({ limit: 99 });

  createNewProduct(product: Omit<ProductInterface, 'id'>) {
    return from(
      this.angularFirestore.collection<Omit<ProductInterface, 'id'>>('products').add({ ...product })
    );
  }

  updateProduct(id: string, product: Omit<ProductInterface, 'id'>) {
    return from(
      this.angularFirestore
        .collection<ProductInterface>('products')
        .doc(id)
        .update({ ...product })
    );
  }

  deleteProduct(id: string) {
    return from(this.angularFirestore.collection<ProductInterface>('products').doc(id).delete());
  }
}
