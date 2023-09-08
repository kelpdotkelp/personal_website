//Scroll bottom container while keeping header fixed
observer = new ResizeObserver(entries => {
    header = document.querySelector("#header")
    header.style.position = "fixed";
    header.style.width = "100%";

    main = document.querySelector("#main")
    main.style.position = "absolute";
    main.style.top = header.clientHeight + "px";
    main.style.width = "100%";
});

observer.observe(document.querySelector("#header"))