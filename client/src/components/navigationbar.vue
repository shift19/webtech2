<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="/home">Series</a>
                <div
                        class="navbar-collapse justify-content-end"
                        id="navbarNav"
                >
                    <ul class="navbar-nav">
                        <li class="nav-item ">
                            <router-link class="nav-link" to="/home"
                            >Home
                            </router-link
                            >
                        </li>
                        <li class="nav-item ">
                            <router-link class="nav-link" to="/createSerie"
                            >Create new serie
                            </router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/listSeries"
                            >List all series
                            </router-link
                            >
                        </li>
                        <li class="nav-item active">
                            <a @click="logUserOut" class="nav-link"> Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "navigationbar",
        methods: {
            logUserOut() {
                localStorage.removeItem("jwt");
                this.$router.push("/");
            }
        }
    }
</script>

<style scoped>

</style>