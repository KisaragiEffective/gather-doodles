{
    const b = [...document.querySelectorAll(".e_e_sim .emoji")]
        .filter(x => x instanceof HTMLImageElement)
        .map(x => new URL(x.parentElement.parentElement.href).searchParams.get("id"));
    const c = [...document.querySelectorAll('a[href^="/custom_emoji_explorer.html?domain="]')]
        .map(x => x.parentElement.textContent);

    const d = [...b, ...c].map(x => new URL(x))
        .map(x => ({ host: x.hostname, name: x.pathname.split("/").slice(-1)[0] }))
        .map(x => `https://${x.host}/api/emoji?name=${x.name}`)
        .map(x => fetch(x).then(r => r.json()).then(m => ({license: m.license ?? "unknown", image: m.url, nsfw: m.isSensitive, localOnly: m.localOnly})));
    Promise.allSettled(d)
        .then(x => console.table(x.filter(y => y.status === "fulfilled").map(y => y.value)));
}
