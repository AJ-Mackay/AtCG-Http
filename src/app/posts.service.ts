import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.http.post<{name: string}>('https://atcg-httpbackend-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData).subscribe(responseData => {
      console.log(responseData);
    });
    }

    fetchPosts() {
        this.http.get<{[key: string]: Post}>('https://atcg-httpbackend-default-rtdb.europe-west1.firebasedatabase.app/posts.json').pipe(map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key });
        }
      }
      return postsArray;
    })).subscribe(posts => {
    });
    }
}