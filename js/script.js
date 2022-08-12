window.onload = function () {
	const caseContent = [];
	const tableArr = [];
	const header = document.getElementById("header");
	const navItems = document.querySelectorAll(".navbar > ul > .navbar-item");
	const introTab = document.getElementsByClassName("content-tab")[0];
	const tab1 = introTab.children[0].children[0];
	const tab2 = introTab.children[1].children[0];
	const introContent1 = document.querySelectorAll(".tab-content-item")[0];
	const introContent2 = document.querySelectorAll(".tab-content-item")[1];
	const contPrice = document.getElementsByClassName("content-price")[0];
	const modalWrap = document.getElementsByClassName("modal-wrap")[0];
	const priceModal = document.getElementsByClassName("price-modal")[0];
	let tableIndex = 0;
	let scrollPosition = document.documentElement.scrollTop || 0;

	const scrollHandler = throttle(function () {
		let currentPosition = document.documentElement.scrollTop;
		if (currentPosition > scrollPosition) {
			header.classList.add("disable");
		} else {
			header.classList.remove("disable");
		}
		scrollPosition = currentPosition;
	}, 100);

	const scrollEvent = () => {
		document.addEventListener("scroll", scrollHandler)
	};

	scrollEvent();
	header.addEventListener("mouseover", () => {
		document.removeEventListener("scroll", scrollHandler);
	});
	header.addEventListener("mouseout", () => {
		scrollEvent();
	});

	navItems.forEach(function(i) {
		i.addEventListener("click",()=> {
			setTimeout(()=>{
				 scrollPosition = document.documentElement.scrollTop;
			},50);
		});
	});

	for (var i = 0; i < 2; i++) {
		caseContent.push(document.getElementsByClassName("case-content")[i]);
		for (var j = 0; j < caseContent[i].children.length; j++) {
			caseContent[i].children.item(j).addEventListener("mouseenter", caseContentPause);
			caseContent[i].children.item(j).addEventListener("mouseleave", caseContentRun);
		}

	}

	function caseContentPause(i) {
		for (var i = 0; i < 2; i++) {
			caseContent[i].className = caseContent[i].className + " case-paused";
		}
	}

	function caseContentRun(i) {
		for (var i = 0; i < 2; i++) {
			caseContent[i].className = caseContent[i].className.split("case-paused").join("");
		}
	}

	tab1.addEventListener("click", () => {
		tabHandler(tab1, tab2)
	});
	tab2.addEventListener("click", () => {
		tabHandler(tab2, tab1)
	});

	function tabHandler(onTab, offTab) {
		event.preventDefault();
		if (!onTab.classList.contains("active")) {
			const indexNum = [...introTab.children].indexOf(onTab.parenElement);
			onTab.classList.add("active");
			offTab.classList.remove("active");
			introContent1.classList.toggle("item-active");
			introContent2.classList.toggle("item-active");
		}
	}

	for (var i = 0; i < 3; i++) {
		tableArr.push(contPrice.children[i].children[0]);
		tableArr[i].addEventListener("click", tableModal);
	}

	function tableModal() {
		event.preventDefault();
		tableIndex = tableArr.indexOf(event.target);
		priceModal.children[tableIndex].classList.add("able");
		modalWrap.classList.add("able");
		header.classList.add("disable");
	}

	modalWrap.addEventListener("click", function () {
		for (var i = 0; i < 3; i++) {
			priceModal.children[i].classList.remove("able");
		}
		modalWrap.classList.remove("able");
		header.classList.remove("disable");
	});


}

const throttle = (callback, delay) => {
	let timer;
	return (event) => {
		if (timer) return;
		timer = setTimeout(() => {
			callback(event);
			timer = null;
		}, delay);
	}
};