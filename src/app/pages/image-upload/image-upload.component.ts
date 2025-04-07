// import { Component } from '@angular/core';
// import { StorageService } from '../../storage.service';
// import { NgFor } from '@angular/common';

// @Component({
//   selector: 'app-image-upload',
//   imports: [NgFor],
//   templateUrl: './image-upload.component.html',
//   styleUrl: './image-upload.component.css'
// })
// export class ImageUploadComponent {
//   imageUrls: string[] = []; // Array to hold the image URLs

//   constructor(private storageService: StorageService) {}

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     if (file) {
//       this.storageService.upload(file).subscribe(
//         url => {
//           console.log('File uploaded successfully:', url);
//           this.imageUrls.push(url); // Add the URL to the array
//         },
//         error => {
//           console.error('Error uploading file:', error);
//         }
//       );
//     }
//   }
// }
