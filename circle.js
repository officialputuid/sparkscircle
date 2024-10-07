const fs = require('fs');
const path = require('path');
const axios = require('axios');
const colors = require('colors');
const { DateTime } = require('luxon');

class TonCircle {
    constructor() {
        this.headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
            "Content-Type": "application/json",
            "Origin": "https://bot.toncircle.org",
            "Referer": "https://bot.toncircle.org/",
            "Sec-Ch-Ua": '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        };
        
    }

    log(msg, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        switch(type) {
            case 'success':
                console.log(`[${timestamp}] [*] ${msg}`.green);
                break;
            case 'custom':
                console.log(`[${timestamp}] [*] ${msg}`.magenta);
                break;        
            case 'error':
                console.log(`[${timestamp}] [!] ${msg}`.red);
                break;
            case 'warning':
                console.log(`[${timestamp}] [*] ${msg}`.yellow);
                break;
            default:
                console.log(`[${timestamp}] [*] ${msg}`.blue);
        }
    }

    async countdown(seconds) {
        for (let i = seconds; i >= 0; i--) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`===== Chờ ${i} giây để tiếp tục vòng lặp =====`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log('');
    }

    async login(authorization) {
        const url = `https://api.toncircle.org/user/login?c=${Date.now()}`;
        const headers = { ...this.headers, "Authorization": authorization };

        try {
            const response = await axios.post(url, {}, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async getProfile(authorization) {
        const url = `https://api.toncircle.org/user/profile?c=${Date.now()}`;
        const headers = { ...this.headers, "Authorization": authorization };

        try {
            const response = await axios.get(url, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async claimDailyBonus(authorization) {
        const url = `https://api.toncircle.org/user/bonus/daily?c=${Date.now()}`;
        const headers = { ...this.headers, "Authorization": authorization };
        const payload = { withMultiplier: false };

        try {
            const response = await axios.post(url, payload, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async getTasksList(authorization, type = 'regular') {
        let url;
        switch(type) {
            case 'regular':
                url = `https://api.toncircle.org/user/tasks/list?c=${Date.now()}`;
                break;
            case 'one-time':
                url = `https://api.toncircle.org/user/tasks/one-time/list?c=${Date.now()}`;
                break;
            case 'partner':
                url = `https://api.toncircle.org/user/tasks/partner/list?c=${Date.now()}`;
                break;
            default:
                throw new Error('Invalid task type');
        }
        const headers = { ...this.headers, "Authorization": authorization };

        try {
            const response = await axios.get(url, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async startTask(authorization, taskId, type = 'regular') {
        let url;
        switch(type) {
            case 'regular':
                url = `https://api.toncircle.org/user/tasks/start?c=${Date.now()}`;
                break;
            case 'one-time':
                url = `https://api.toncircle.org/user/tasks/one-time/start?c=${Date.now()}`;
                break;
            case 'partner':
                url = `https://api.toncircle.org/user/tasks/partner/start?c=${Date.now()}`;
                break;
            default:
                throw new Error('Invalid task type');
        }
        const headers = { ...this.headers, "Authorization": authorization };
        const payload = { id: taskId };

        try {
            const response = await axios.post(url, payload, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async finalizeTask(authorization, taskId, type = 'regular') {
        let url;
        switch(type) {
            case 'regular':
                url = `https://api.toncircle.org/user/tasks/finalize?c=${Date.now()}`;
                break;
            case 'one-time':
                url = `https://api.toncircle.org/user/tasks/one-time/finalize?c=${Date.now()}`;
                break;
            case 'partner':
                url = `https://api.toncircle.org/user/tasks/partner/finalize?c=${Date.now()}`;
                break;
            default:
                throw new Error('Invalid task type');
        }
        const headers = { ...this.headers, "Authorization": authorization };
        const payload = { id: taskId };

        try {
            const response = await axios.post(url, payload, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async processTasksOfType(authorization, type) {
        const tasksResult = await this.getTasksList(authorization, type);
        if (tasksResult.success) {
            const incompleteTasks = tasksResult.data.tasks.filter(task => !task.completed);
            for (const task of incompleteTasks) {
                const startResult = await this.startTask(authorization, task.id, type);
                if (startResult.success) {
                    const finalizeResult = await this.finalizeTask(authorization, task.id, type);
                    if (finalizeResult.success) {
                        this.log(`Làm nhiệm vụ ${task.data.title} (${type}) thành công | phần thưởng : ${task.reward}`, 'success');
                    } else {
                        this.log(`Làm nhiệm vụ ${task.data.title} (${type}) không thành công | Cần tự làm`, 'error');
                    }
                } else {
                    this.log(`Không thể bắt đầu nhiệm vụ ${task.data.title} (${type}): ${startResult.error}`, 'error');
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } else {
            this.log(`Không thể lấy danh sách nhiệm vụ ${type}: ${tasksResult.error}`, 'error');
        }
    }

    async spin(authorization, bet, chance) {
        const url = `https://api.toncircle.org/user/games/upgrade/spin?c=${Date.now()}`;
        const headers = { ...this.headers, "Authorization": authorization };
        const payload = { bet, chance };

        try {
            const response = await axios.post(url, payload, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async getAd(tg_id) {
        const url = `https://api.adsgram.ai/adv?blockId=3852&tg_id=${tg_id}&tg_platform=android&platform=Win32&language=vi`;
        const headers = {
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
            "Cache-Control": "max-age=0",
            "Connection": "keep-alive",
            "Host": "api.adsgram.ai",
            "Origin": "https://bot.toncircle.org",
            "Referer": "https://bot.toncircle.org/",
            "Sec-Ch-Ua": '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        };

        try {
            const response = await axios.get(url, { headers });
            if (response.status === 200) {
                return { success: true, data: response.data };
            } else {
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async watchAd(adData) {
        try {
            if (!adData.banner || !adData.banner.trackings) {
                throw new Error('Invalid ad data structure');
            }

            const renderTracking = adData.banner.trackings.find(t => t.name === 'render');
            if (renderTracking) {
                await axios.get(renderTracking.value);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            const showTracking = adData.banner.trackings.find(t => t.name === 'show');
            if (showTracking) {
                await axios.get(showTracking.value);
                await new Promise(resolve => setTimeout(resolve, 14000));
            }

            const rewardTracking = adData.banner.trackings.find(t => t.name === 'reward');
            if (rewardTracking) {
                await axios.get(rewardTracking.value);
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async processAdWatching(authorization, tg_id) {
        const profileResult = await this.getProfile(authorization);
        if (profileResult.success) {
            const adWatchTime = DateTime.fromISO(profileResult.data.adWatchTime, { zone: 'utc' }).setZone('local');
            const now = DateTime.local();
    
            if (now < adWatchTime) {
                const timeUntilNextAd = adWatchTime.diff(now).toFormat("hh:mm:ss");
                this.log(`Thời gian xem quảng cáo tiếp theo: ${timeUntilNextAd}`, 'custom');
            } else {
                const adResult = await this.getAd(tg_id);
                if (adResult.success) {
                    this.log('Bắt đầu xem quảng cáo...', 'custom');
                    const watchResult = await this.watchAd(adResult.data);
                    if (watchResult.success) {
                        this.log('Xem quảng cáo thành công!', 'success');
                        const updatedProfileResult = await this.getProfile(authorization);
                        if (updatedProfileResult.success) {
                            const nextAdWatchTime = DateTime.fromISO(updatedProfileResult.data.adWatchTime, { zone: 'utc' })
                                .setZone('local')
                                .plus({ minutes: 2 });
                            const timeUntilNextAd = nextAdWatchTime.diff(now).toFormat("hh:mm:ss");
                            this.log(`Thời gian xem quảng cáo tiếp theo: ${timeUntilNextAd}`, 'custom');
                        }
                    } else {
                        this.log(`Lỗi khi xem quảng cáo: ${watchResult.error}`, 'error');
                    }
                } else {
                    this.log(`Không thể lấy quảng cáo: ${adResult.error}`, 'error');
                }
            }
        } else {
            this.log(`Không thể lấy thông tin tài khoản: ${profileResult.error}`, 'error');
        }
    }

    async main() {
        while (true) {
            const dataFile = path.join(__dirname, 'data.txt');
            const data = fs.readFileSync(dataFile, 'utf8')
                .replace(/\r/g, '')
                .split('\n')
                .filter(Boolean);

            for (let i = 0; i < data.length; i++) {
                const [authorization, tg_id] = data[i].split('|');
                const loginResult = await this.login(authorization);
                if (loginResult.success) {
                    const profileResult = await this.getProfile(authorization);
                    if (profileResult.success) {
                        const firstName = profileResult.data.firstName;
                        console.log(`========== Tài khoản ${i + 1} | ${firstName.green} ==========`);
                        this.log('Đăng nhập thành công!', 'success');
                        this.log(`Sparks Balance: ${profileResult.data.pointsBalance}`, 'custom');
                        this.log(`Circle Balance: ${profileResult.data.starsBalance}`, 'custom');

                        const bonusResult = await this.claimDailyBonus(authorization);
                        if (bonusResult.success) {
                            this.log(`Điểm danh thành công!`, 'success');
                        } else {
                            this.log(`Không thể nhận điểm danh hàng ngày: ${bonusResult.error}`, 'error');
                        }

                        await this.processTasksOfType(authorization, 'regular');
                        await this.processTasksOfType(authorization, 'one-time');
                        await this.processTasksOfType(authorization, 'partner');

                        await this.processAdWatching(authorization, tg_id);

                        const updatedProfileResult = await this.getProfile(authorization);
                        if (updatedProfileResult.success) {
                            this.log(`Sparks có sẵn để spin: ${updatedProfileResult.data.pointsBalance}`, 'custom');
                            if (updatedProfileResult.data.pointsBalance > 0) {
                                const spinResult = await this.spin(authorization, updatedProfileResult.data.pointsBalance, 100);
                                if (spinResult.success) {
                                    this.log(`Spin thành công, nhận ${spinResult.data.winAmount} Circles`, 'success');
                                } else {
                                    this.log(`Không thể thực hiện spin: ${spinResult.error}`, 'error');
                                }
                            }
                        } else {
                            this.log(`Không thể lấy thông tin tài khoản cập nhật: ${updatedProfileResult.error}`, 'error');
                        }

                    } else {
                        this.log(`Không thể lấy thông tin tài khoản: ${profileResult.error}`, 'error');
                    }
                } else {
                    this.log(`Đăng nhập không thành công! ${loginResult.error}`, 'error');
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            this.log('Đã xử lý xong tất cả tài khoản. Nghỉ 150 giây trước khi tiếp tục vòng lặp.', 'warning');
            await this.countdown(150); 
        }
    }
}

const client = new TonCircle();
client.main().catch(err => {
    client.log(err.message, 'error');
    process.exit(1);
});
