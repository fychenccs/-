@echo off
chcp 65001 >nul
title 知识库自动化工作流
cd /d "%~dp0"

:menu
cls
echo ======================================================
echo           知识库自动化工作流
echo ======================================================
echo  1 - 同步并本地预览 [启动 localhost:8080]
echo  2 - 同步并一键全网更新 [推送至 GitHub 和 Vercel]
echo  0 - 退出
echo ======================================================
set /p choice=请输入选项 [1/2/0]: 

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto deploy
if "%choice%"=="0" exit
goto menu

:dev
echo.
echo [1/2] 正在从 Obsidian 同步笔记...
call node ./scripts/sync-obsidian.mjs
echo.
echo [2/2] 正在启动本地预览服务...
call npx quartz build --serve
pause
goto menu

:deploy
echo.
echo [1/3] 正在从 Obsidian 同步笔记...
call node ./scripts/sync-obsidian.mjs
echo.
echo [2/3] 正在提交版本变更...
git add .
git commit -m "feat: publish updated notes"
echo.
echo [3/3] 正在推送到 GitHub...
git push
echo.
echo ======================================================
echo [完成] 代码已推送，Vercel 正在自动重新构建！
echo 线上地址: https://maple-notes-one.vercel.app
echo ======================================================
echo.
pause
goto menu
