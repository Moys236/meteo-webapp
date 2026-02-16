export const dailyMeteo = (data) => {
    
    const getJ = (date) => {
      const Nday = date.getDay();
      switch (Nday) {
        case 0:
          return "Dim";
        case 1:
          return "Lun";
        case 2:
          return "Mar";
        case 3:
          return "Mer";
        case 4:
          return "Jeu";
        case 5:
          return "Ven";
        case 6:
          return "Sam";
        default:
          break;
      }
    };

    const priority = [
        ["11d", "11n"],
        ["13d", "13n"],
        ["09d", "09n"],
        ["10d", "10n"],
        ["50d", "50n"],
        ["04d", "04n"],
        ["03d", "03n"],
        ["02d", "02n"],
        ["01d", "01n"]
    ];

    const daily = data.reduce((acc, curr) => {
        const date = new Date(curr.dt * 1000);
        const currday = getJ(date);
        
        let dayData = acc.find(item => item.day === currday);
        
        if (!dayData) {
            dayData = {
                day: currday,
                maxTemp: curr.main.temp,
                minTemp: curr.main.temp,
                windSpeed: Number(curr.wind.speed),
                icon: curr.weather[0].icon,
                description: curr.weather[0].description
            };
            acc.push(dayData);
            return acc;
        }
        
        dayData.maxTemp = Math.max(curr.main.temp, dayData.maxTemp);
        dayData.minTemp = Math.min(curr.main.temp, dayData.minTemp);
        dayData.windSpeed = Math.max(curr.wind.speed, dayData.windSpeed);
        
        const currIcon = curr.weather[0].icon;
        const accIcon = dayData.icon;
        
        if (priority.some(group => group.includes(currIcon)) && !priority.some(group => group.includes(accIcon))) {
            dayData.icon = currIcon;
            dayData.description = curr.weather[0].description;
        } else if (priority.some(group => group.includes(currIcon)) && priority.some(group => group.includes(accIcon))) {
            const currPriority = priority.findIndex(group => group.includes(currIcon));
            const accPriority = priority.findIndex(group => group.includes(accIcon));
            
            if (currPriority < accPriority) {
                dayData.icon = currIcon;
                dayData.description = curr.weather[0].description;
            }
        }
        
        return acc;
    }, []);
    
    return daily;
}