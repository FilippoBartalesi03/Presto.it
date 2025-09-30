fetch("./Annunci.json")
  .then(response => response.json())
  .then((data) => {
    let categoryWrapper = document.querySelector("#categoryWrapper");
    let cardWrapper = document.querySelector("#cardWrapper");

    let priceInput = document.querySelector("#priceInput");
    let priceNumber = document.querySelector("#priceNumber");

    function setCategoryFilter() {
      let categories = data.map(announcement => announcement.category);
      let uniqueCategory = [];

      categories.forEach(category => {
        if (!uniqueCategory.includes(category)) {
          uniqueCategory.push(category);
        }
      });

      uniqueCategory.forEach(category => {
        let div = document.createElement("div");
        div.classList.add("form-check");
        div.innerHTML = `
          <input class="form-check-input" type="radio" name="category" id="${category}">
          <label class="form-check-label" for="${category}">
            ${category}
          </label>
        `;
        categoryWrapper.appendChild(div);
      });
    }

    function showcards(array) {
      cardWrapper.innerHTML = "";
      array.sort((a, b) => b.price - a.price);
      array.forEach((annuncio) => {
        let div = document.createElement("div");
        div.classList.add("card", "card-custom", "mt-2");
        div.innerHTML = `
          <img src="${annuncio.image}" class="card-img-top" alt="${annuncio.name}">
          <div class="card-body">
            <h5 class="card-title">${annuncio.name}</h5>
            <p class="card-text">${annuncio.price} €</p>
            <p class="card-text">${annuncio.category}</p>
          </div>
        `;
        cardWrapper.appendChild(div);
      });
    }

    function setPriceInput() {
      let maxPrice = Math.max(...data.map(item => item.price));
      priceInput.max = maxPrice;
      priceInput.value = maxPrice;
      priceNumber.innerHTML = maxPrice;
    }

    function applyFilters() {
      let radios = document.querySelectorAll(".form-check-input");
      let checked = Array.from(radios).find(btn => btn.checked);
      let categoria = checked?.id || "all";
      let maxPrice = Number(priceInput.value);

      let filtered = data.filter(annuncio => {
        let matchCategory = categoria === "all" || annuncio.category === categoria;
        let matchPrice = annuncio.price <= maxPrice;
        return matchCategory && matchPrice;
      });

      showcards(filtered);
    }

    setCategoryFilter();
    setPriceInput();
    showcards(data);

    let radios = document.querySelectorAll(".form-check-input");
    radios.forEach(button => {
      button.addEventListener("click", () => {
        applyFilters();
      });
    });

    priceInput.addEventListener("input", () => {
      priceNumber.innerHTML = priceInput.value;
      applyFilters();
    });

    let wordInput = document.querySelector("#wordInput");

    wordInput.addEventListener("input", ()=> {
      console.log(wordInput.value);
      filterByWord();
    })

    function filterByWord() {
      let filtered = data.filter( (annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase())  )

      showcards(filtered);
    }
  });

