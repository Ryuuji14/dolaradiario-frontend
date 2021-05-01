<script>
  import { onMount } from "svelte";
  import "svelte-carousel/dist/index.css";

  let selectedProvider = 2;
  let prices;
  let providers;
  let price = "Actualizando...";
  let provider = "";
  let updated = "";
  let img = "";
  let url = "";
  let numberPrice = 0;
  let usdCalc = 1;
  let bsCalc = 0;
  let isCalculating = true;

  onMount(async () => {
    await fetch(`https://dolaradiario.herokuapp.com/main`)
      .then((r) => r.json())
      .then((data) => {
        providers = data.data.providers;
        prices = data.data.prices;
        console.log(providers);
        console.log(prices);
        updateValues();
      });
  });

  const copyToClipboard = () => {
    const x = document.createElement("textarea");
    document.body.appendChild(x);
    x.value = `El dólar hoy ${new Date().toLocaleDateString("es-ve", {
      timeZone: "America/Caracas",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })} cuesta Bs. ${price} según ${
      provider != "Promedio" ? provider : "Dolar A Diario"
    }`;
    x.select();
    document.execCommand("copy");
    alert("¡Copiado!");
    document.body.removeChild(x);
  };

  const rightClick = () => {
    selectedProvider = selectedProvider < 5 ? selectedProvider + 1 : 1;
    updateValues();
  };

  const leftClick = () => {
    selectedProvider = selectedProvider > 1 ? selectedProvider - 1 : 5;
    updateValues();
  };

  const updateValues = () => {
    const providerObject = providers.find((p) => p.id === selectedProvider);
    provider = providerObject.description;
    img = providerObject.logo;
    url = providerObject.url;
    const priceObject = prices.find((p) => p.provider_id === selectedProvider);
    price = priceObject.value
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    numberPrice = priceObject.value;
    updated = new Date(priceObject.date).toLocaleDateString("es-VE", {
      timeZone: "America/Caracas",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    });
    bsCalc = usdCalc * numberPrice;
  };

  const toggleCalculator = () => {
    isCalculating = !isCalculating;
    usdCalc = 1;
    bsCalc = usdCalc * numberPrice;
  };

  const calculateUSD = () => {
    usdCalc = parseFloat(document.getElementById('usd').value);
    bsCalc = Math.round(usdCalc * numberPrice*100)/100;
  };

  const calculateBS = (e) => {
    bsCalc = parseFloat(document.getElementById('bs').value);
    usdCalc = Math.round(bsCalc / numberPrice*100)/100;
  };
</script>

<img class="w-64 h-32 mx-auto" src="./assets/logo.png" alt="dolar logo" />

<div class="flex flex-col items-center my-20">
  <div class="text-5xl text-center text-white md:text-7xl">
    <div class="md:flex md:space-x-2">
      {#if !isCalculating}
        <p on:click={toggleCalculator}>$1</p>
        <p>=</p>
        <p class="text-primary" id="price" on:click={toggleCalculator}>BS. {price}</p>
      {:else}
        $<input
          class="shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-black"
          id="usd"
          on:input={calculateUSD}
          type="number"
          value={usdCalc}
        />
        <p>=</p>
        Bs.<input
          class="shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-black"
          value={bsCalc}
          id="bs"
          type="number"
          on:input={calculateBS}
        />
      {/if}
    </div>
  </div>
  <div class="flex">
    <p class="pl-40 text-lg text-white md:pl-0">Actualizado {updated}</p>
  </div>

  <div class="flex flex-col items-center my-12">
    <div class="flex">
      <div class="flex h-8 text-xl">
        <div class="hidden md:visible">
          <p class="text-white" style="margin-right: 5px;">SEGÚN</p>
        </div>
      </div>

      <div
        class="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer mr-14"
        on:click={leftClick}
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
          class="w-4 h-4 control feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>

      <div class="flex justify-center h-8 space-x-4">
        <img src={img} alt={provider} />

        <a class="text-2xl text-primary" style="color: #14CC60;" href={url}
          >{provider}</a
        >
      </div>

      <div
        class="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer ml-14"
        on:click={rightClick}
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
          class="w-4 h-4 control feather feather-chevron-right"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  </div>
  <div class="flex space-x-7 md:space-x-14">
    <div>
      <button
        class="flex items-center justify-center w-16 h-16 bg-gray-500 rounded-full md:w-20 md:h-20"
        on:click={toggleCalculator}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-12 h-12"
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
        class="flex items-center justify-center w-16 h-16 bg-gray-500 rounded-full md:w-20 md:h-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-12 h-12"
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
    <div class="flex space-x-5 md:hidden">
      <div>
        <button
          class="flex items-center justify-center w-16 h-16 bg-gray-500 rounded-full md:w-20 md:h-20"
          on:click={copyToClipboard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12"
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
      </div>
      <div>
        <button
          class="flex items-center justify-center w-16 h-16 bg-gray-500 rounded-full md:w-20 md:h-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12"
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
</div>
<footer
  class="absolute bottom-0 w-full p-1 text-center text-white border-t bg-primary border-grey"
>
  © 2021 KURODev.net - Todos los derechos reservados.
</footer>

<style>
</style>
