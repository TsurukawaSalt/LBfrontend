<template>
    <div>
        <Header>
        </Header>
        <el-container>
            <Aside>
            </Aside>
            <el-main>
                这里是浏览历史
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import Header from "@/components/header.vue";
    import Aside from "@/components/UserAside.vue";
    export default {
        name: "MyHistory",
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