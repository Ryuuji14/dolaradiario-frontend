<script>
  import { onMount } from "svelte";
  import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
  } from "chart.js";
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );
  onMount(async () => {
    await fetch(`https://dolaradiario.herokuapp.com/history`)
      .then((r) => r.json())
      .then((data) => {
        const info = data.data;
        const providers = info.map((i) => i.provider);
        const fechas = [
          ...new Set(info[0].prices.map((price) => price.date)),
        ].reverse();
        const randomColor = () => {
          var letters = "0123456789ABCDEF".split("");
          var color = "#";
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        };
        const dataset = info.map((i) => {
          const prices = fechas.map((f) => {
            return i.prices.find((p) => {
              return p.date === f;
            });
          });
          return {
            data: prices.map((p) => (p ? p.price : undefined)),
            label: i.provider,
            borderColor: randomColor(),
          };
        });
        console.log(dataset);
        new Chart(document.getElementById("line-chart"), {
          type: "line",
          data: {
            labels: fechas,
            datasets: dataset,
          },
          options: {
            title: {
              display: true,
              text: "Precio del dólar a lo largo del último mes...",
            },
          },
        });
      });
  });
</script>

<div class="flex justify-center">
  <div class="flex-col" style="width: 700px !important">
    <canvas id="line-chart" />
  </div>
</div>

<style>
</style>
