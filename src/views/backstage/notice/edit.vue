<template>
<div class="Edit within">
    <el-row :gutter="24">
        <el-row :gutter="24">
            <div style="margin:23px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/Backstage/notice' }" style="font-size:18px;">管理公告</el-breadcrumb-item>
                    <el-breadcrumb-item style="font-size:18px;">编辑公告</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="18">
                <el-input style="margin:10px 0;" v-model="news.title" placeholder="标题"></el-input>
                <edit ref="edit"></edit>
                <div style="float:right;margin:10px 0;">
                    <el-button @click="putOut(1)">保存草稿</el-button>
                    <el-button type="primary" @click="putOut(0)">发布公告</el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix" style="text-align:left;font-weight:bold;">
                        <span>操作</span>
                    </div>
                    <div>
                        <sidebar ref="sidebar" :operation="operation"></sidebar>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-row>
</div>
</template>

<script>
import edit from '@/components/backstage/notice/edit/froalaEdit.vue'
import sidebar from '@/components/backstage/notice/edit/sidebar.vue'
export default {
    data() {
        return {
            adminId: '',
            news: {
                title: '',
                content: ''
            },
            operation: {
                top: 0,
                newsCategoryId: '',
                newsLabels: []
            },
        }
    },
    created() {
        this.adminId = this.$cookies.get('activeUser').split('&')[0]
        let id = this.$route.query.id
        if (id) {
            this.setPage(id);
        }
    },
    methods: {
        putOut(flag) {
            let _this = this
            //数据
            this.news.content = this.$refs.edit.content
            this.operation = this.$refs.sidebar.operation
            //判断是修改还是发布
            let method = 'post'
            let data = {
                adminId: _this.adminId,
                categoryId: _this.operation.newsCategoryId,
                content: _this.news.content,
                flag: flag,
                newsLabel: _this.operation.newsLabels.join(','),
                title: _this.news.title,
                top: _this.operation.top,
                topTime: this.operation.date?this.operation.date:(new Date() - 0) / 1000
            }
            if (this.$route.query.id) {
                method = 'put'
                data.newsId = this.$route.query.id
            }
            this.$axios('news/', {
                method: method,
                data: data
            }).then(res => {
                if (res.data.code === 200) {
                    let msg = ''
                    if (flag == 1) msg = '保存成功'
                    else msg = '发布成功'
                    this.$message.success(msg);
                    this.$router.push('/backstage/notice/manager')
                } else {
                    this.$message.error(res.data.message)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        setPage(id) {
            let _this = this;
            this.$axios('news/' + id, {
                method: 'get',
            }).then(res => {
                _this.news.title = res.data.data.title;
                this.$refs.edit.resetValue(res.data.data.content);
                let operation={
                    top:res.data.data.top,
                    newsCategoryId:res.data.data.newsCategory.id,
                    newsLabels:res.data.data.newsLabel.split(",")
                }
                // _this.operation.top = res.data.data.top;
                // _this.operation.newsCategoryId = res.data.data.newsCategory.id;
                // _this.operation.newsLabels = res.data.data.newsLabel.split(",");
                this.$refs.sidebar.operation=operation
            })
        }
    },
    components: {
        edit,
        sidebar
    }
}
</script>

