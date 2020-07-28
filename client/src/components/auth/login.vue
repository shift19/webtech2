<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form
                        @submit.prevent="loginUser"
                        class="text-center border border-primary p-5"
                        style="margin-top:70px;height:auto;padding-top:100px !important;"
                >
                    <p>E-mail</p>
                    <input
                            class="form-control mb-5"
                            id="email"
                            placeholder="Email"
                            required
                            type="text"
                            v-model="login.email"
                    />

                    <p>Password</p>
                    <!-- Password -->
                    <input
                            class="form-control mb-5"
                            id="password"
                            placeholder="Password"
                            required
                            type="password"
                            v-model="login.password"
                    />

                    <!-- Sign in button -->
                    <center>
                        <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                            Sign in
                        </button>

                        <p/>

                        <router-link class="btn btn-outline-primary btn-block w-75 my-4" to="/register"
                        >Create new account
                        </router-link
                        >
                    </center>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from "sweetalert2";

    export default {
        data() {
            return {
                login: {
                    email: "",
                    password: ""
                }
            };
        },
        methods: {
            async loginUser() {
                const swalWithBootstrapButtons = swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false
                })
                try {
                    let response = await this.$http.post("/user/login", this.login);
                    let token = response.data.token;
                    localStorage.setItem("jwt", token);
                    if (token) {
                        swalWithBootstrapButtons.fire("Success", "Login successful.", "success");
                        this.$router.push("/home");
                    }
                } catch (err) {
                    swalWithBootstrapButtons.fire("Error", "Something went wrong", "error");
                    console.log(err.response);
                }
            }
        }
    };
</script>
