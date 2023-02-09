<template>
  <ol v-for="movie, index in movies" class="list" :key="movie.name">
    <li>
      <a href="">
        <h4 class="hide">{{movie.name}}</h4>
        <span class="hide rate" :class="'rate'+movie.rate[0]">{{movie.rate[1]}}</span>
        <strong class="rank">{{index + 1}}</strong>
        <img class="poster" :src="require(`@/assets/${movie.src}`)" :alt=movie.name />
        <span v-if="moveContext==='평점순'" class="desc">
            <i class="star"><b :style="'width:'+movie.score*10+'%'"></b></i>
            <em class="score">{{movie.score}}</em>
        </span>
        <span v-else-if="moveContext==='예매순'" class="desc">
          <i class="reserv_title">예매율</i>
          <em class="reserv_num">{{movie.ticketing}}</em>
        </span>
        <span v-else-if="moveContext==='개봉일순'" class="desc">
          <i class="open_title">개봉일</i>
          <em class="open_num">{{movie.openDate}}</em>
        </span>
        <span v-else-if="moveContext==='주말관객순'" class="desc">
          <i class="week_title">주말관객</i>
          <em class="week_num">{{movie.week}}</em>
        </span>
        <span v-else-if="moveContext==='다운로드순'" class="desc">
          <i class="sale_title">판매율</i>
          <em class="sale_num">{{movie.sale}}</em>
        </span>
      </a>
    </li>
  </ol>
</template>

<script>
export default {
  props:['movies','moveContext'],
}
</script>

<style>

</style>