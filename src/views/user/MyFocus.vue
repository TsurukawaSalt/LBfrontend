<template>
    <div>
        <Header>
        </Header>
        <el-container>
            <Aside>
            </Aside>
            <el-main>
                这里是我的关注
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import Header from "@/components/header.vue";
    import Aside from "@/components/UserAside.vue";
    export default {
        name: "MyFocus",
        components: {
            Header,
            Aside,
        },
        mounted() {

        },
        data() {
            return {
                perInfo: {

                }
            };
        },
        methods: {

        }
    }
</script>