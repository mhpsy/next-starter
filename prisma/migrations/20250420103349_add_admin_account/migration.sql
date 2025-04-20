-- CreateTable
CREATE TABLE "admin_account" (
    "account_id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "user_id" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "delete_flag" INTEGER NOT NULL DEFAULT 0,
    "created_by_id" INTEGER,
    "created_by_name" TEXT,
    "updated_by_id" INTEGER,
    "updated_by_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "admin_account_pkey" PRIMARY KEY ("account_id")
);

-- AddForeignKey
ALTER TABLE "admin_account" ADD CONSTRAINT "admin_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
