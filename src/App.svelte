<script>
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { toast } from "@zerodevx/svelte-toast";

  let selectedProvider = 2;
  let prices;
  let providers;
  let price = "Actualizando...";
  let provider = "Actualizando...";
  let updated = "";
  let img = "";
  let url = "";
  let numberPrice = 0;
  let usdCalc = 1;
  let bsCalc = 0;
  let usdVisible = "1";
  let bsVisible = "0";
  let isCalculating = false;
  let isViewingReport = false;

  onMount(async () => {
    await fetch(`https://dolaradiario.herokuapp.com/main`)
      .then((r) => r.json())
      .then((data) => {
        providers = data.data.providers;
        prices = data.data.prices;
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
    toast.push("¡Precio copiado con éxito!", {
      theme: {
        "--toastBackground": "#48BB78",
        "--toastProgressBackground": "#2F855A",
      },
    });
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

  const beautifyNumber = (number) => {
    return number
      .toString()
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseBeautifulNumber = (number) => {
    return parseFloat(number.toString().replace(".", "").replace(",", "."));
  };

  const updateValues = () => {
    const providerObject = providers.find((p) => p.id === selectedProvider);
    provider = providerObject.description;
    img = providerObject.logo;
    url = providerObject.url;
    const priceObject = prices.find((p) => p.provider_id === selectedProvider);
    price = beautifyNumber(priceObject.value);
    numberPrice = priceObject.value;
    updated = new Date(priceObject.date).toLocaleDateString("es-VE", {
      timeZone: "America/Caracas",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    });
    bsCalc = Math.round(usdCalc * numberPrice * 100) / 100;
    bsVisible = beautifyNumber(bsCalc);
  };

  const toggleCalculator = () => {
    isCalculating = !isCalculating;
    isViewingReport = false;
    usdCalc = 1;
    bsCalc = usdCalc * numberPrice;
  };

  const checkNaN = () => {
    if (isNaN(bsCalc) || isNaN(usdCalc)) {
      usdCalc = 1;
      bsCalc = numberPrice;
      bsVisible = beautifyNumber(bsCalc);
      usdVisible = beautifyNumber(usdCalc);
    }
  };

  const calculateUSD = () => {
    usdCalc = parseBeautifulNumber(document.getElementById("usd").value);
    bsCalc = Math.round(usdCalc * numberPrice * 100) / 100;
    bsVisible = beautifyNumber(bsCalc);
    usdVisible = beautifyNumber(usdCalc);
    checkNaN();
  };

  const calculateBS = (e) => {
    bsCalc = parseBeautifulNumber(document.getElementById("bs").value);
    usdCalc = Math.round((bsCalc / numberPrice) * 100) / 100;
    usdVisible = beautifyNumber(usdCalc);
    bsVisible = beautifyNumber(bsCalc);
    checkNaN();
  };

  const toggleViewingReport = () => {
    isViewingReport = !isViewingReport;
  }
</script>

<SvelteToast />
<img class="w-64 h-32 mx-auto" src="./assets/logo.png" alt="dolar logo" />

<div class="flex flex-col items-center my-20">
  <div class="text-5xl text-center text-white md:text-7xl">
    <div class="md:flex md:space-x-2">
      {#if !isCalculating}
        <p on:click={toggleCalculator}>$1</p>
        <p>=</p>
        <p class="text-primary" id="price" on:click={toggleCalculator}>
          BS. {price}
        </p>
      {:else}
        $<input
          class="shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-black"
          id="usd"
          on:input={calculateUSD}
          value={usdVisible}
        />
        <p>=</p>
        Bs.<input
          class="shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-black"
          value={bsVisible}
          id="bs"
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
        {#if !isCalculating}
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
          </svg>
        {:else}
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        {/if}
      </button>
    </div>
    <div>
      <button
        class="flex items-center justify-center w-16 h-16 bg-gray-500 rounded-full md:w-20 md:h-20"
        on:click={toggleViewingReport}
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

    </div>
  </div>
</div>
<footer
  class="absolute bottom-0 w-full p-1 text-center text-white border-t bg-primary border-grey"
>
  © 2021 KURODev.net - Todos los derechos reservados..
</footer>

<style>
</style>
