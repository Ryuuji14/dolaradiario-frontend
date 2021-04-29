<script>
  import { Router, Route } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";

  import Chart from "./Chart.svelte";
  export let url = "";
</script>

<Router {url}>
  <img class="mx-auto" src="./assets/logo.png" alt="dolar logo" />

  <div class="flex flex-col items-center my-12">
    <div class="text-white text-7xl">$1 = BS. 2.370.023,73</div>
    <nav>
      <NavLink to="chart">Chart</NavLink>
    </nav>
    <div>
      <Route path="chart" component={Chart} />
    </div>
    <div class="flex">
      <div class="hidden">1</div>
      <div>2</div>
      <div>3</div>
    </div>
    <div class="flex justify-end">
      <p class="text-white text-sm">Actualizado a las 9:00 AM</p>
    </div>
    <div class="flex text-gray-700">
      <div class="flex flex-col items-center my-12">
        <div class="flex text-gray-700">
          <div class="flex h-8 text-xl">
            <p class="text-white" style="margin-right: 5px;">SEGÚN</p>
          </div>
          <div
            class="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>

          <div class="flex h-8 text-xl">
            <p class="text-primary">Monitor Dolar</p>
          </div>
          <div
            class="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-right w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify space-between">
      <div>
        <button
          class="rounded-full h-20 w-20 flex items-center justify-center bg-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg></button
        >
      </div>
      <div>
        <button
          class="rounded-full h-20 w-20 flex items-center justify-center bg-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg></button
        >
      </div>
      <div class="md:hidden">
        <button
          class="rounded-full h-20 w-20 flex items-center justify-center bg-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg></button
        >
        <button
          class="rounded-full h-20 w-20 flex items-center justify-center bg-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg></button
        >
      </div>
    </div>
  </div>
  <footer
    class="w-full text-center bg-primary text-white border-t border-grey p-4 absolute bottom-0"
  >
    © 2021 KURODev.net - Todos los derechos reservados.
  </footer>
</Router>

<style>
  img {
    width: 285px;
    height: 142px;
    min-width: 275px;
    min-height: 138px;
  }
</style>
