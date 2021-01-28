# an
```
<AnBannerDiv>
    <div class="banner_img">
        <div v-for="(v,i) in banner">
            <img @click.stop="$An_link.to('/ProductDetails',{'product_id':v.product_id})" :src="v.img" @error="$An.imgError()" />
        </div>
    </div>
</AnBannerDiv>
----
.banner{
    width:93%;
    margin:auto;
    border-radius:5px;
    overflow: hidden;
    .banner_img{
        width:100%;
        height:128px;
    }
}
```
