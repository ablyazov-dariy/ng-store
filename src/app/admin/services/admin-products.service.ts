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

  createNewProduct(product: ProductInterface) {
    return from(this.angularFirestore.collection<ProductInterface>('products').add({ ...product }));
  }

  updateProduct(product: ProductInterface) {
    return this.angularFirestore
      .collection<ProductInterface>('products')
      .doc(product.id)
      .update({ ...product });
  }
  deleteProduct(product: ProductInterface) {
    return from(
      this.angularFirestore.collection<ProductInterface>('products').doc(product.id).delete()
    );
  }
}
