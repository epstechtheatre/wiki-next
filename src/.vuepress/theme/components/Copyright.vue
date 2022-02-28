<template>
    <div class="copyright inner">
        <p>
            ©EPS Technical Theatre Department<br>
            <img class="copyright-logo" src="/images/svg/wiki_logo.svg" alt="Sarlett Logo"/>
        </p>
    </div>
</template>

<style lang="stylus" scoped>
@require "../styles/wrapper.styl"

.copyright {
    @extend $wrapper

    padding-top: 30px;
    right: 0%;
    position: absolute;
    text-align: right;
}

.copyright-logo {
    max-width: 100vw;
    width: 250px;
}
</style>