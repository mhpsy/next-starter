-- CreateTable
CREATE TABLE "admin_department" (
    "department_id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "department_name" TEXT NOT NULL,
    "order_num" INTEGER NOT NULL DEFAULT 0,
    "leader" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "delete_flag" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" INTEGER,
    "created_by_name" TEXT,
    "updated_by_id" INTEGER,
    "updated_by_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "admin_department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "admin_user" (
    "user_id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "user_type" INTEGER NOT NULL DEFAULT 1,
    "department_id" INTEGER,
    "login_ip" TEXT,
    "login_at" TIMESTAMP(3),
    "sort" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "delete_flag" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" INTEGER,
    "created_by_name" TEXT,
    "updated_by_id" INTEGER,
    "updated_by_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "admin_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "admin_role" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_description" TEXT NOT NULL,
    "data_scope" INTEGER NOT NULL DEFAULT 0,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "delete_flag" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" INTEGER,
    "created_by_name" TEXT,
    "updated_by_id" INTEGER,
    "updated_by_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "admin_role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "admin_user_role" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "admin_user_role_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "admin_permission" (
    "permission_id" SERIAL NOT NULL,
    "permission_name" TEXT NOT NULL,
    "permission_description" TEXT,
    "parent_id" INTEGER,
    "url_path" TEXT NOT NULL DEFAULT '',
    "open_type" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT NOT NULL DEFAULT '',
    "permission_type" TEXT NOT NULL DEFAULT 'menu',
    "permission_code" TEXT NOT NULL DEFAULT '',
    "extend_parent" BOOLEAN NOT NULL DEFAULT true,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "delete_flag" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" INTEGER,
    "created_by_name" TEXT,
    "updated_by_id" INTEGER,
    "updated_by_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "admin_permission_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "admin_api_permission" (
    "api_permission_id" SERIAL NOT NULL,
    "api_permission_name" TEXT NOT NULL,
    "api_permission_description" TEXT,
    "api_permission_path" TEXT NOT NULL,
    "api_permission_method" TEXT NOT NULL,
    "token" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "delete_flag" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" INTEGER,
    "created_by_name" TEXT,
    "updated_by_id" INTEGER,
    "updated_by_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_api_permission_pkey" PRIMARY KEY ("api_permission_id")
);

-- CreateTable
CREATE TABLE "admin_ui_api_permission" (
    "permission_id" INTEGER NOT NULL,
    "api_permission_id" INTEGER NOT NULL,

    CONSTRAINT "admin_ui_api_permission_pkey" PRIMARY KEY ("permission_id","api_permission_id")
);

-- CreateTable
CREATE TABLE "admin_role_permission" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "admin_role_permission_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "admin_post" (
    "post_id" SERIAL NOT NULL,
    "post_code" TEXT NOT NULL,
    "post_color" TEXT NOT NULL,
    "post_name" TEXT NOT NULL,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "delete_flag" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" INTEGER,
    "created_by_name" TEXT,
    "updated_by_id" INTEGER,
    "updated_by_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "admin_post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "admin_user_post" (
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "admin_user_post_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "admin_role_department" (
    "role_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,

    CONSTRAINT "admin_role_department_pkey" PRIMARY KEY ("role_id","department_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_email_key" ON "admin_user"("email");

-- AddForeignKey
ALTER TABLE "admin_user" ADD CONSTRAINT "admin_user_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "admin_department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_user_role" ADD CONSTRAINT "admin_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_user_role" ADD CONSTRAINT "admin_user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "admin_role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_ui_api_permission" ADD CONSTRAINT "admin_ui_api_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "admin_permission"("permission_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_ui_api_permission" ADD CONSTRAINT "admin_ui_api_permission_api_permission_id_fkey" FOREIGN KEY ("api_permission_id") REFERENCES "admin_api_permission"("api_permission_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_role_permission" ADD CONSTRAINT "admin_role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "admin_role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_role_permission" ADD CONSTRAINT "admin_role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "admin_permission"("permission_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_user_post" ADD CONSTRAINT "admin_user_post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_user_post" ADD CONSTRAINT "admin_user_post_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "admin_post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_role_department" ADD CONSTRAINT "admin_role_department_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "admin_role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_role_department" ADD CONSTRAINT "admin_role_department_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "admin_department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;
